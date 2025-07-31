import React from 'react';

const TextInput = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
            {...props}
        />
    </div>
);

export default TextInput;
