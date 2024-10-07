import { useState } from "react";
import "./DropDown.css";

const DropDown = ({
  id,
  label,
  values,
  value,
  setValue,
  isRequired,
  errorMsg,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const cssClass = value === "" && isRequired && isTouched ? "error-input" : "";

  return (
    <div className="dropdown">
      <label htmlFor={id}>{label}</label>
      <select
        className={cssClass}
        aria-required={isRequired}
        required={isRequired}
        name={id}
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onBlur={() => setIsTouched(true)}
      >
        <option value="">Choose an option</option>
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {value === "" && isRequired && isTouched && (
        <div className="error-text">{errorMsg}</div>
      )}
    </div>
  );
};

export default DropDown;
