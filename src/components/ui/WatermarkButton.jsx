import React from 'react';

const WatermarkButton = ({ onClick }) => {
    return (
        <div className="mt-8 text-center">
            <button
                onClick={onClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow 
                    transition transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
            >
                Add Watermark & Download ZIP
            </button>
        </div>
    );
};

export default WatermarkButton;