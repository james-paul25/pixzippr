import React from 'react';

const SubmitButton = ({ loading, success }) => (
    <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 min-w-[100px]"
    >
        {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : success ? (
            <span className="text-green-300">✔</span>
        ) : (
            'Submit'
        )}
    </button>
);

export default SubmitButton;
