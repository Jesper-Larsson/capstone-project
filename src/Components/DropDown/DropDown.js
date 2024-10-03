import "./DropDown.css";

const DropDown = ({ id, label, values, value, setValue, isRequired }) => (
  <div className="dropdown">
    <label htmlFor={id}>{label}</label>
    <select
      aria-required={isRequired}
      name={id}
      id={id}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      {values.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

export default DropDown;
