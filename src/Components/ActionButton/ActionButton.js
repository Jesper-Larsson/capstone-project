import "./ActionButton.css";
const ActionButton = ({ onAction, children, isDisabled }) => (
  <button disabled={isDisabled} className="action-button" onClick={onAction}>
    {children}
  </button>
);

export default ActionButton;
