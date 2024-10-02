import "./DatePicker.css";
const DatePicker = ({ id, label, date, setDate, todayDateString }) => (
  <div className="datepicker">
    <label htmlFor={id}>{label}</label>
    <input
      type="date"
      min={todayDateString}
      name={id}
      id={id}
      value={date}
      onChange={(e) => setDate(e.currentTarget.value)}
    />
  </div>
);

export default DatePicker;
