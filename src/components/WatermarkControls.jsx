import React from 'react';
import TextInput from './ui/TextInput';
import SelectInput from './ui/SelectInput';
import RangeInput from './ui/RangeInput';
import FileInput from './ui/FileInput';

const WatermarkControls = ({ settings, onSettingsChange }) => {
    const handleChange = (key, value) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <div className="w-full lg:w-96 space-y-4">
            <SelectInput
                label="Watermark Type"
                value={settings.type}
                onChange={(e) => handleChange('type', e.target.value)}
                options={[
                    { value: 'text', label: 'Text' },
                    { value: 'image', label: 'Image' },
                ]}
            />

            {settings.type === 'text' ? (
                <>
                    <TextInput
                        label="Text"
                        type="text"
                        value={settings.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                    />
                    <div className="row gap-2">
                        <TextInput
                            type="number"
                            min="8"
                            max="100"
                            placeholder="Font size"
                            value={settings.fontSize}
                            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                        />
                        <SelectInput
                            value={settings.fontFamily}
                            onChange={(e) => handleChange('fontFamily', e.target.value)}
                            options={[
                                { value: 'Arial', label: 'Arial' },
                                { value: 'Verdana', label: 'Verdana' },
                                { value: 'Georgia', label: 'Georgia' },
                                { value: 'Courier New', label: 'Courier New' },
                            ]}
                        />
                    </div>
                    <TextInput
                        label="Color"
                        type="color"
                        value={settings.color}
                        onChange={(e) => handleChange('color', e.target.value)}
                    />
                </>
            ) : (
                <>
                    <FileInput
                        label="Upload Watermark Image"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    onSettingsChange({
                                        ...settings,
                                        src: reader.result,
                                        width: 100,
                                        height: 100,
                                    });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <div className="flex gap-2">
                            <TextInput
                                type="number"
                                placeholder="Width"
                                value={settings.width || ''}
                                onChange={(e) => handleChange('width', parseInt(e.target.value) || 100)}
                            />
                            <TextInput
                                type="number"
                                placeholder="Height"
                                value={settings.height || ''}
                                onChange={(e) => handleChange('height', parseInt(e.target.value) || 100)}  
                            />
                    </div>
                </>
            )}

            <RangeInput
                label="Opacity"
                min="0"
                max="1"
                step="0.01"
                value={settings.opacity}
                onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
            />

            <TextInput
                label="Rotation (degrees)"
                type="number"
                value={settings.angle}
                onChange={(e) => handleChange('angle', parseInt(e.target.value))}
            />
        </div>
    );
};

export default WatermarkControls;
