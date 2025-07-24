import { useRef, useState, useCallback } from 'react';

const useWatermarkCanvas = (image, settings, onSettingsChange) => {
    const canvasRef = useRef(null);
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
    }, [image.preview, settings]);

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

    return {
        canvasRef,
        drawCanvas,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};

export default useWatermarkCanvas;
