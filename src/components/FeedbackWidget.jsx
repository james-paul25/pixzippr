import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ReportModal from '../modals/ReportModal';

const FeedbackWidget = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setOpen(true)}
                    className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
                    aria-label="Report Issue"
                >
                    <MessageCircle size={20} />
                </button>
            </div>

            <ReportModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default FeedbackWidget;
