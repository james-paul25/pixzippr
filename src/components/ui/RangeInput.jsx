const RangeInput = ({ label, ...props }) => (
    <div>
        {label && <label className="block mb-1 font-semibold">{label}</label>}
        <input type="range" className="w-full" {...props} />
    </div>
);

export default RangeInput;
  