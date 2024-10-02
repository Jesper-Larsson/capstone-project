import "./DropDown.css";

const DropDown = ({ id, label, values, value, setValue }) => (
  <div className="dropdown">
    <label htmlFor={id}>{label}</label>
    <select
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
