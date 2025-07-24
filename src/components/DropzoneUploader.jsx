import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

const DropzoneUploader = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        multiple: true,
    });

    return (
        <div
            {...getRootProps()}
            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
            <UploadCloud size={48} className="text-indigo-500 mb-2" />
            <p className="text-gray-700 dark:text-gray-300 mb-1">
                Drag and drop your images here, or{' '}
                <span className="text-indigo-600 font-semibold">browse</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Only JPG, PNG, WEBP are supported
            </p>
            <input {...getInputProps()} />
        </div>
    );
};

export default DropzoneUploader;