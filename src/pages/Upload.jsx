import React, { useState, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DropzoneUploader from '../components/DropzoneUploader';
import ImagePreviewGrid from '../components/ImagePreviewGrid';
import WatermarkButton from '../components/WatermarkButton';

const Upload = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

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

    const dataURLToBlob = (dataurl) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new Blob([u8arr], { type: mime });
    };

    const addWatermarkAndZip = async () => {
        const { Canvas, Image, Text } = await import('fabric');
        const zip = new JSZip();

        console.log("Canvas:", Canvas);
        console.log("Image:", Image);
        console.log("Text:", Text);

        for (const { file } of files) {
            const imgData = await readFile(file);
            const canvas = new Canvas(null, {
                width: 800,
                height: 800,
            });

            await new Promise((resolve) => {
                Image.fromURL(imgData, (img) => {
                    const scale = Math.min(800 / img.width, 800 / img.height, 1);
                    img.scale(scale);
                    canvas.setWidth(img.width * scale);
                    canvas.setHeight(img.height * scale);
                    canvas.add(img);

                    const watermark = new Text('PixZippr', {
                        fontSize: 20,
                        fill: 'rgba(255,255,255,0.6)',
                        top: img.height * scale - 30,
                        left: img.width * scale - 110,
                    });

                    canvas.add(watermark);
                    canvas.renderAll();

                    const dataUrl = canvas.toDataURL({ format: 'png' });
                    const fileName = `watermarked_${file.name}`;
                    zip.file(fileName, dataURLToBlob(dataUrl));
                    resolve();
                });
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
                    <ImagePreviewGrid files={files} removeImage={removeImage} />
                    <WatermarkButton onClick={addWatermarkAndZip} />
                </>
            )}
        </div>
    );
};

export default Upload;
