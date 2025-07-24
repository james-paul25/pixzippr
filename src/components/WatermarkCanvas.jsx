import React, { useRef, useEffect, useState, useCallback } from 'react';

const WatermarkCanvas = ({ image, settings, onSettingsChange }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image.preview;

        img.onload = () => {
            const scale = Math.min(800 / img.width, 800 / img.height, 1);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            canvas.width = scaledWidth;
            canvas.height = scaledHeight;

            ctx.clearRect(0, 0, scaledWidth, scaledHeight);
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

            ctx.save();
            ctx.globalAlpha = settings.opacity || 0.5;
            ctx.translate(settings.left || 50, settings.top || 50);
            ctx.rotate((settings.angle || 0) * Math.PI / 180);

            if (settings.type === 'image' && settings.src) {
                const wmImg = new Image();
                wmImg.src = settings.src;
                wmImg.onload = () => {
                    const wmWidth = settings.width || wmImg.width * 0.3;
                    const wmHeight = settings.height || wmImg.height * 0.3;
                    ctx.drawImage(wmImg, 0, 0, wmWidth, wmHeight);
                };
            } else {
                ctx.font = `bold ${settings.fontSize}px ${settings.fontFamily}`;
                ctx.fillStyle = settings.color || 'white';
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 5;
                ctx.fillText(settings.text || 'PixZippr', 0, 0);
            }

            ctx.restore();
        };
    },[image.preview, settings]);

    useEffect(() => {
        drawCanvas();
    }, [image, settings, drawCanvas]);

    const handleMouseDown = (e) => {
        setDragging(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setOffset({
            x: e.clientX - rect.left - (settings.left || 0),
            y: e.clientY - rect.top - (settings.top || 0),
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const left = e.clientX - rect.left - offset.x;
        const top = e.clientY - rect.top - offset.y;

        onSettingsChange({ ...settings, left, top });
    };

    const handleMouseUp = () => setDragging(false);

    return (
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
            <div
                ref={containerRef}
                className="relative border rounded shadow max-w-full overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <canvas ref={canvasRef} className="max-w-full" />
            </div>

            <div className="w-full lg:w-96 space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Watermark Type</label>
                    <select
                        value={settings.type}
                        onChange={(e) => onSettingsChange({ ...settings, type: e.target.value })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                    </select>
                </div>

                {settings.type === 'text' ? (
                    <>
                        <div>
                            <label className="block mb-1 font-semibold">Text</label>
                            <input
                                type="text"
                                value={settings.text}
                                onChange={(e) => onSettingsChange({ ...settings, text: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="8"
                                max="100"
                                value={settings.fontSize}
                                onChange={(e) => onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })}
                                className="w-1/2 border p-2 rounded"
                                placeholder="Font size"
                            />
                            <select
                                value={settings.fontFamily}
                                onChange={(e) => onSettingsChange({ ...settings, fontFamily: e.target.value })}
                                className="w-1/2 border p-2 rounded"
                            >
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Courier New">Courier New</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Color</label>
                            <input
                                type="color"
                                value={settings.color}
                                onChange={(e) => onSettingsChange({ ...settings, color: e.target.value })}
                                className="w-full"
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block mb-1 font-semibold">Upload Watermark Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        onSettingsChange({ ...settings, src: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-1 font-semibold">Opacity</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={settings.opacity}
                        onChange={(e) => onSettingsChange({ ...settings, opacity: parseFloat(e.target.value) })}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Rotation (degrees)</label>
                    <input
                        type="number"
                        value={settings.angle}
                        onChange={(e) => onSettingsChange({ ...settings, angle: parseInt(e.target.value) })}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default WatermarkCanvas;
