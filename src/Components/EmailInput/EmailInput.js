import { useState } from "react";
import "./EmailInput.css";
const EmailInput = ({ id, label, value, setValue, isRequired }) => {
  const [hasInvalidInput, setHasInvalidInput] = useState(false);
  const validate = (e) => {
    const isValid = e.target.validity.valid && e.target.value !== "";
    setHasInvalidInput(!isValid);
    setValue({ isValid: isValid, email: e.target.value });
  };
  const cssClass = hasInvalidInput ? "error-input" : "";
  return (
    <div className="email-input">
      <label htmlFor={id}>{label}</label>
      <input
        className={cssClass}
        type="email"
        id={id}
        aria-required={isRequired}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => validate(e)}
      />
      {hasInvalidInput && (
        <div className="error-text">Please enter a valid email address.</div>
      )}
    </div>
  );
};
export default EmailInput;
