import { useState } from "react";
import "./NumberInput.css";
const NumberInput = ({
  id,
  label,
  value,
  setValue,
  max,
  min,
  isRequired,
  errorMsg,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const isInvalid = isTouched && (value <= 0 || value > 10);
  const cssClass = isInvalid ? "error-input" : "";
  return (
    <div className="number-input">
      <label htmlFor={id}>{label}</label>
      <input
        className={cssClass}
        aria-required={isRequired}
        required={isRequired}
        type="number"
        id={id}
        value={value >= min && value <= max ? value : ""}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
        onBlur={() => {
          setIsTouched(true);
        }}
      />
      {isInvalid && <div className="error-text">{errorMsg}</div>}
    </div>
  );
};
export default NumberInput;
