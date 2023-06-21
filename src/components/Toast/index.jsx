import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      autoClose={5000}
      position="top-right"
      theme="light"
      pauseOnHover
      newestOnTop
    />
  );
};

export default Toast;
