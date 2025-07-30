import React, { useEffect } from 'react';
import useWatermarkCanvas from '../hooks/useWatermarkCanvas';
import WatermarkControls from './WatermarkControls';

const WatermarkCanvas = ({ image, settings, onSettingsChange }) => {
    const {
        canvasRef,
        drawCanvas,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    } = useWatermarkCanvas(image, settings, onSettingsChange);

    useEffect(() => {
        drawCanvas();
    }, [image, settings, drawCanvas]);

    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
            <div
                className="relative border rounded shadow max-w-full overflow-hidden touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas ref={canvasRef} className="max-w-full" />
            </div>
            <WatermarkControls settings={settings} onSettingsChange={onSettingsChange} />
        </div>
    );
};

export default WatermarkCanvas;
