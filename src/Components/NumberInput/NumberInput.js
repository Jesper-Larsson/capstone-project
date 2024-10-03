import "./NumberInput.css";
const NumberInput = ({ id, label, value, setValue, max, min, isRequired }) => {
  return (
    <div className="number-input">
      <label htmlFor={id}>{label}</label>
      <input
        aria-required={isRequired}
        type="number"
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
      />
    </div>
  );
};
export default NumberInput;
