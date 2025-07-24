// src/components/WatermarkControls.jsx
import React from 'react';

const WatermarkControls = ({ settings, onSettingsChange }) => {
    return (
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
                            onChange={(e) =>
                                onSettingsChange({ ...settings, fontSize: parseInt(e.target.value) })
                            }
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
    );
};

export default WatermarkControls;
