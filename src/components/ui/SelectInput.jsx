import React from 'react';

const SelectInput = ({ label, options, ...props }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <select
            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
            {...props}
        >
            <option value="">Select Type</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

export default SelectInput;
