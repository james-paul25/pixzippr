import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DropzoneUploader from '../components/DropzoneUploader';
import ImagePreviewGrid from '../components/ImagePreviewGrid';
import WatermarkButton from '../components/WatermarkButton';
import WatermarkCanvas from '../components/WatermarkCanvas';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [watermarkSettings, setWatermarkSettings] = useState({});

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prev) => [...prev, ...newFiles]);
        if (!selectedImage && newFiles.length > 0) {
            setSelectedImage(newFiles[0]);
        }
    }, [selectedImage]);

    const removeImage = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
    };

    const readFile = (file) =>
        new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });

    const dataURLToBlob = (dataURL) => {
        const [header, data] = dataURL.split(',');
        const mime = header.match(/:(.*?);/)[1];
        const binary = atob(data);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }
        return new Blob([array], { type: mime });
    };

    const addWatermarkAndZip = async () => {
        const zip = new JSZip();

        for (const { file } of files) {
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
                    ctx.translate(watermarkSettings.left || 50, watermarkSettings.top || 50);
                    ctx.rotate((watermarkSettings.angle || 0) * Math.PI / 180);

                    if (watermarkSettings.type === 'image' && watermarkSettings.src) {
                        const wmImg = new Image();
                        wmImg.onload = () => {
                            const wmWidth = wmImg.width * 0.3;
                            const wmHeight = wmImg.height * 0.3;
                            ctx.drawImage(wmImg, 0, 0, wmWidth, wmHeight);
                            ctx.restore();

                            const dataUrl = canvas.toDataURL('image/png');
                            const fileName = `watermarked_${file.name}`;
                            zip.file(fileName, dataURLToBlob(dataUrl));
                            resolve();
                        };
                        wmImg.src = watermarkSettings.src;
                    } else {
                        ctx.font = `bold ${watermarkSettings.fontSize || 24}px ${watermarkSettings.fontFamily || 'Arial'}`;
                        ctx.fillStyle = 'white';
                        ctx.shadowColor = 'rgba(0,0,0,0.3)';
                        ctx.shadowOffsetX = 2;
                        ctx.shadowOffsetY = 2;
                        ctx.shadowBlur = 5;
                        ctx.fillText(watermarkSettings.text || 'PixZippr', 0, 0);
                        ctx.restore();

                        const dataUrl = canvas.toDataURL('image/png');
                        const fileName = `watermarked_${file.name}`;
                        zip.file(fileName, dataURLToBlob(dataUrl));
                        resolve();
                    }
                };
                img.src = imgData;
            });
        }

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'PixZippr_Watermarked.zip');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
                Upload Images
            </h1>

            <DropzoneUploader onDrop={onDrop} />

            {files.length > 0 && (
                <>
                    <ImagePreviewGrid
                        files={files}
                        removeImage={removeImage}
                        onSelect={(img) => setSelectedImage(img)}
                    />
                    {selectedImage && (
                        <WatermarkCanvas
                            image={selectedImage}
                            watermarkText="PixZippr Demo"
                            watermarkImage={null}
                            onUpdate={(canvas, obj) => {
                                setWatermarkSettings(obj);
                            }}
                        />
                    )}
                    <WatermarkButton onClick={addWatermarkAndZip} />
                </>
            )}
        </div>
    );
};

export default Upload;
