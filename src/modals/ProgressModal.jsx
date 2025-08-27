import React from 'react';

const ProgressModal = ({ progress, isVisible }) => {
    if (!isVisible) return null;

    const percentage = Math.round(progress * 100);

    return (
        <div className="fixed inset-0 backdrop-blur-md  flex items-center justify-center z-50">
            <div className="bg-indigo-800 rounded-lg shadow-xl p-6 w-80 text-center">
                <h2 className="text-lg font-semibold mb-4 text-indigo-200"> Processing Images </h2>
                <div className="w-full bg-indigo-700 h-4 rounded overflow-hidden mb-3">
                    <div
                        className="bg-indigo-400 h-full transition-all"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-indigo-300">{percentage}% complete</p>
            </div>
        </div>

    );
};

export default ProgressModal;
