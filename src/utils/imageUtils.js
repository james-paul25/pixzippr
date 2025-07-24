import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const readFile = (file) =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });

export const dataURLToBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
};

export const addWatermarkAndZip = async (
    files,
    watermarkSettings,
    setProgress,
    setIsProcessing
) => {
    setIsProcessing(true);
    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
        const { file } = files[i];
        const imgData = await readFile(file);
        const img = new Image();

        await new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const scale = Math.min(800 / img.width, 800 / img.height, 1);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;

                canvas.width = scaledWidth;
                canvas.height = scaledHeight;

                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                ctx.save();
                ctx.globalAlpha = watermarkSettings.opacity || 0.5;
                ctx.translate(
                    watermarkSettings.left || 50,
                    watermarkSettings.top || 50
                );
                ctx.rotate(((watermarkSettings.angle || 0) * Math.PI) / 180);

                if (watermarkSettings.type === 'image' && watermarkSettings.src) {
                    const wmImg = new Image();
                    wmImg.onload = () => {
                        const wmWidth =
                            watermarkSettings.width || wmImg.width * 0.3;
                        const wmHeight =
                            watermarkSettings.height || wmImg.height * 0.3;
                        ctx.drawImage(wmImg, 0, 0, wmWidth, wmHeight);
                        ctx.restore();

                        const dataUrl = canvas.toDataURL('image/png');
                        zip.file(
                            `watermarked_${file.name}`,
                            dataURLToBlob(dataUrl)
                        );
                        resolve();
                    };
                    wmImg.src = watermarkSettings.src;
                } else {
                    ctx.font = `bold ${watermarkSettings.fontSize}px ${watermarkSettings.fontFamily}`;
                    ctx.fillStyle = watermarkSettings.color;
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 5;
                    ctx.fillText(watermarkSettings.text, 0, 0);
                    ctx.restore();

                    const dataUrl = canvas.toDataURL('image/png');
                    zip.file(
                        `watermarked_${file.name}`,
                        dataURLToBlob(dataUrl)
                    );
                    resolve();
                }
            };
            img.src = imgData;
        });

        setProgress((i + 1) / files.length);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'PixZippr_Watermarked.zip');
    setIsProcessing(false);
};
