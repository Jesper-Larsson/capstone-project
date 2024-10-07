import { useState } from "react";
import "./DatePicker.css";
const DatePicker = ({
  id,
  label,
  date,
  setDate,
  minDate,
  isRequired,
  errorMsg,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const cssClass = isTouched && date < minDate ? "error-input" : "";
  return (
    <div className="datepicker">
      <label htmlFor={id}>{label}</label>
      <input
        className={cssClass}
        aria-required={isRequired}
        required={isRequired}
        type="date"
        min={minDate}
        name={id}
        id={id}
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
        onBlur={() => setIsTouched(true)}
      />
      {isTouched && date < minDate && (
        <div className="error-text">{errorMsg}</div>
      )}
    </div>
  );
};

export default DatePicker;
