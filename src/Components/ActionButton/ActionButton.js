import "./ActionButton.css";
const ActionButton = ({ onAction, children, isDisabled, ariaLabel }) => (
  <button
    type="submit"
    disabled={isDisabled}
    className="action-button"
    onClick={onAction}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default ActionButton;
