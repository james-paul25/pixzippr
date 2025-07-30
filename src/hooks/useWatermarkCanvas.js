import { useRef, useState, useCallback, useEffect } from 'react';

const useWatermarkCanvas = (image, settings, onSettingsChange) => {
    const canvasRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const wmImageRef = useRef(null);

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
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

            if (settings.type === 'image' && wmImageRef.current) {
                const wmImg = wmImageRef.current;
                const wmWidth = settings.width || wmImg.width * 0.3;
                const wmHeight = settings.height || wmImg.height * 0.3;
                ctx.drawImage(wmImg, 0, 0, wmWidth, wmHeight);
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

    useEffect(() => {
        if (settings.type === 'image' && settings.src) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = settings.src;
            img.onload = () => {
                wmImageRef.current = img;
                drawCanvas();
            };
        }
    }, [settings.src, settings.type, drawCanvas]);

    const handlePointerDown = useCallback((x, y) => {
        setDragging(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setOffset({
            x: x - rect.left - (settings.left || 0),
            y: y - rect.top - (settings.top || 0),
        });
    }, [settings]);

    const handlePointerMove = useCallback((x, y) => {
        if (!dragging) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const left = x - rect.left - offset.x;
        const top = y - rect.top - offset.y;

        const newSettings = { ...settings, left, top };
        onSettingsChange(newSettings);
        drawCanvas();
    }, [dragging, drawCanvas, offset, onSettingsChange, settings]);

    const handleMouseDown = (e) => handlePointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => setDragging(false);

    const handleTouchStart = useCallback((e) => {
        const touch = e.touches[0];
        handlePointerDown(touch.clientX, touch.clientY);
    }, [handlePointerDown]);
    const handleTouchMove = useCallback((e) => {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
    }, [handlePointerMove]);
    const handleTouchEnd = useCallback(() => {
            setDragging(false);
    }, [])
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleTouchStartWrapper = (e) => {
            e.preventDefault();
            handleTouchStart(e);
        };
        const handleTouchMoveWrapper = (e) => {
            e.preventDefault();
            handleTouchMove(e);
        };
        const handleTouchEndWrapper = (e) => {
            e.preventDefault();
            handleTouchEnd(e);
        };

        canvas.addEventListener('touchstart', handleTouchStartWrapper, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false });
        canvas.addEventListener('touchend', handleTouchEndWrapper, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', handleTouchStartWrapper);
            canvas.removeEventListener('touchmove', handleTouchMoveWrapper);
            canvas.removeEventListener('touchend', handleTouchEndWrapper);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    return {
        canvasRef,
        drawCanvas,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};

export default useWatermarkCanvas;
