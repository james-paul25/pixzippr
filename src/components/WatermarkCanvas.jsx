import React, { useEffect, useRef, useState } from 'react';

const WatermarkCanvas = ({ image, watermarkText, watermarkImage, onUpdate }) => {
    const canvasRef = useRef(null);
    const [text, setText] = useState(watermarkText || 'PixZippr Demo');
    const [fontSize, setFontSize] = useState(24);
    const [opacity, setOpacity] = useState(0.5);
    const [angle, setAngle] = useState(0);
    const [fontFamily, setFontFamily] = useState('Arial');

    useEffect(() => {
        if (!image || !image.preview) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            const scale = Math.min(500 / img.width, 400 / img.height, 1);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;

            canvas.width = scaledWidth;
            canvas.height = scaledHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

            ctx.save();
            ctx.globalAlpha = opacity;

            ctx.translate(50, 50); // watermark position
            ctx.rotate((angle * Math.PI) / 180);

            if (watermarkImage) {
                const wmImg = new Image();
                wmImg.onload = () => {
                    const wmWidth = wmImg.width * 0.3;
                    const wmHeight = wmImg.height * 0.3;
                    ctx.drawImage(wmImg, 0, 0, wmWidth, wmHeight);
                    ctx.restore();

                    // Call onUpdate with canvas and watermark config
                    onUpdate(canvas, {
                        type: 'image',
                        left: 50,
                        top: 50,
                        opacity,
                        angle,
                        src: watermarkImage,
                    });
                };
                wmImg.src = watermarkImage;
            } else {
                ctx.font = `bold ${fontSize}px ${fontFamily}`;
                ctx.fillStyle = 'white';
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 5;
                ctx.fillText(text, 0, 0);
                ctx.restore();

                onUpdate(canvas, {
                    type: 'text',
                    left: 50,
                    top: 50,
                    opacity,
                    angle,
                    fontSize,
                    fontFamily,
                    text,
                });
            }
        };

        img.src = image.preview;
    }, [image, text, fontSize, fontFamily, opacity, angle, watermarkImage, onUpdate]);

    return (
        <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Live Watermark Preview</h2>
            <div className="w-full max-w-full overflow-x-auto">
                <canvas ref={canvasRef} className="border shadow-md w-full h-auto" />
            </div>

            {!watermarkImage && (
                <div className="flex flex-wrap gap-4 items-center mt-4">
                    <div>
                        <label className="block text-sm font-medium">Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="p-1 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Font Size</label>
                        <input
                            type="number"
                            min="10"
                            max="100"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="p-1 border rounded w-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Font Family</label>
                        <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="p-1 border rounded"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Comic Sans MS">Comic Sans</option>
                            <option value="Courier New">Courier New</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="flex gap-6 mt-4">
                <div>
                    <label className="block text-sm font-medium">Opacity</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Rotation (deg)</label>
                    <input
                        type="number"
                        min="0"
                        max="360"
                        value={angle}
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="p-1 border rounded w-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default WatermarkCanvas;
