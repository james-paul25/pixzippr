import { sendReport } from './emailServices';

export const handleReportSubmit = async ({
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
    onClose
}) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const formatted = `
    <strong>Report Type:</strong> ${type}<br>
    <strong>Title:</strong> ${title}<br>
    <strong>Description:</strong> ${description}
  `;

    try {
        await sendReport({ name, email, body: formatted });
        setSuccess(true);
        resetForm();

        setTimeout(() => setSuccess(false), 1000);
        setTimeout(() => onClose(), 500);   
    } catch (e) {
        console.error(e);
        setError('Failed to send report.');
    } finally {
        setLoading(false);
    }
};
