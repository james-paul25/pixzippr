import React from 'react';
import { Trash2 } from 'lucide-react';

const ImagePreviewGrid = ({ files, onRemove }) => {
    return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {files.map((img, index) => (
                <div
                    key={index}
                    className="relative group bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg duration-300"

                >
                    <img
                        src={img.preview}
                        alt={`preview-${index}`}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-3 text-sm">
                        <p className="truncate text-gray-700 dark:text-gray-200">
                            {img.file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(img.file.size / 1024).toFixed(1)} KB
                        </p>
                    </div>
                    <button
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow hover:bg-red-100 dark:hover:bg-red-700 transition"
                    >
                        <Trash2 size={16} className="text-red-500 cursor-pointer" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ImagePreviewGrid;