import { useEffect } from "react";
import "./ErrorToast.css";
import delay from "../../Utils/Delay";
const ErrorToast = ({ errorMessage, destroySelf }) => {
  useEffect(() => {
    const destroy = async () => {
      await delay(4000);
      destroySelf();
    };
    destroy();
  });
  return <div className="error-toast">{errorMessage}</div>;
};

export default ErrorToast;
