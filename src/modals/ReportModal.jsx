import React, { useState } from 'react';
import { useEscapeClose } from '../hooks/useEscapeClose';
import { sendReport } from '../services/emailServices';

const ReportModal = ({ isOpen, onClose }) => {
    useEscapeClose(onClose);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [description, setDescription] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formatted = "Report Type: " + type +
            "\nTitle: " + title +
            "\nDescription: " + description;

        try {
            const response = await sendReport({ name: name, email: email, body: formatted });
            alert(response);
            console.log(response);
        } catch (e) {
            alert(e);
        }
        
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
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Report Type</label>
                        <select
                            name="type"
                            className="w-full p-2 mt-1 rounded border dark:bg-gray-700 dark:text-white"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
