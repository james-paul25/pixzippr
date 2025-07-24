import React from 'react';

const ProgressModal = ({ progress, isVisible }) => {
    if (!isVisible) return null;

    const percentage = Math.round(progress * 100);

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">Processing Images</h2>
                <div className="w-full bg-gray-200 h-4 rounded overflow-hidden mb-3">
                    <div
                        className="bg-blue-500 h-full transition-all"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600">{percentage}% complete</p>
            </div>
        </div>
    );
};

export default ProgressModal;
