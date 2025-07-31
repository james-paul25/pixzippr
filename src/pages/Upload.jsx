import React, { useState, useCallback } from 'react';
import DropzoneUploader from '../components/ui/DropzoneUploader';
import ImagePreviewGrid from '../components/ui/ImagePreviewGrid';
import WatermarkCanvas from '../components/WatermarkCanvas';
import WatermarkButton from '../components/ui/WatermarkButton';
import ProgressModal from '../modals/ProgressModal';

import { addWatermarkAndZip } from '../utils/imageUtils';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [watermarkSettings, setWatermarkSettings] = useState({
        text: 'PixZippr',
        fontSize: 24,
        fontFamily: 'Arial',
        color: 'white',
        opacity: 0.5,
        angle: 0,
        top: 50,
        left: 50,
        type: 'text',
        src: null,
    });

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

    const onClear = (index) => {
        const updated = [...files];
        updated.splice(index, files.length);
        setFiles(updated);
        if (files[index] === selectedImage) {
            setSelectedImage(null);
        }
    }

    const removeImage = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
        if (files[index] === selectedImage) {
            setSelectedImage(null);
        }
    };

    const handleWatermark = () => {
        addWatermarkAndZip(files, watermarkSettings, setProgress, setIsProcessing);
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
                        onRemove={removeImage}
                        onSelect={(img) => setSelectedImage(img)}
                        onClear={onClear}
                    />

                    {selectedImage && (
                        <WatermarkCanvas
                            image={selectedImage}
                            settings={watermarkSettings}
                            onSettingsChange={setWatermarkSettings}
                        />
                    )}

                    <WatermarkButton onClick={handleWatermark} />
                </>
            )}

            <ProgressModal progress={progress} isVisible={isProcessing} />
        </div>
    );
};

export default Upload;
