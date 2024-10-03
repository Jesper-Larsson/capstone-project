import "./ActionButton.css";
const ActionButton = ({ onAction, children, isDisabled }) => (
  <button
    type="submit"
    disabled={isDisabled}
    className="action-button"
    onClick={onAction}
  >
    {children}
  </button>
);

export default ActionButton;
