import React, { useState } from 'react';
import { useEscapeClose } from '../hooks/useEscapeClose';
import { handleReportSubmit } from '../services/reportService';
import TextInput from '../components/ui/TextInput';
import SelectInput from '../components/ui/SelectInput';
import SubmitButton from '../components/ui/SubmitButton';
import TextareaInput from '../components/ui/TextAreaInput';

const ReportModal = ({ isOpen, onClose }) => {
    useEscapeClose(onClose);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setType('');
        setTitle('');
        setDescription('');
    };

    const handleSubmit = (e) => {
        handleReportSubmit({
            e,
            name,
            email,
            type,
            title,
            description,
            setLoading,
            setSuccess,
            setError,
            resetForm,
            onClose,
        });
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
                    <TextInput
                        label="Name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <SelectInput
                        label="Report Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        options={[
                            { value: 'bug', label: 'Bug' },
                            { value: 'ui', label: 'UI/UX Issue' },
                            { value: 'feedback', label: 'Feedback' },
                            { value: 'other', label: 'Other' },
                        ]}
                    />

                    <TextInput
                        label="Title"
                        type="text"
                        placeholder="Enter report title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <TextareaInput
                        label="Description"
                        placeholder="Provide detailed explanation..."
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <div className="flex flex-col items-end gap-2 pt-2 w-full">
                        <SubmitButton loading={loading} success={success} />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;
