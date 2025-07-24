import React, { useState } from 'react';
import { useEscapeClose } from '../hooks/useEscapeClose';

const ReportModal = ({ isOpen, onClose }) => {
    useEscapeClose();

    const [form, setForm] = useState({
        type: '',
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted report:', form);
        // TODO: Send to backend
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg relative">
                <button
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Report an Issue</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Report any issues or concerns you have encountered.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Report Type</label>
                        <select
                            name="type"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            value={form.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="bug">Bug</option>
                            <option value="ui">UI/UX Issue</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            placeholder="Enter report title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            placeholder="Provide detailed explanation..."
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
