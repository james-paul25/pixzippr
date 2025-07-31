const FileInput = ({ label, ...props }) => (
    <div>
        {label && <label className="block mb-1 font-semibold">{label}</label>}
        <input type="file" className="w-full border p-2 rounded" {...props} />
    </div>
);

export default FileInput;
  