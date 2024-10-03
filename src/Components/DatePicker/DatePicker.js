import "./DatePicker.css";
const DatePicker = ({ id, label, date, setDate, minDate, isRequired }) => (
  <div className="datepicker">
    <label htmlFor={id}>{label}</label>
    <input
      aria-required={isRequired}
      type="date"
      min={minDate}
      name={id}
      id={id}
      value={date}
      onChange={(e) => setDate(e.currentTarget.value)}
    />
  </div>
);

export default DatePicker;
