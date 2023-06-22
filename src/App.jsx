import useLanguage from "./hooks/App/useLanguage";
import useTheme from "./hooks/App/useTheme";
import useModal from "./hooks/App/useModal";
import useUser from "./hooks/App/useUser";
import AppRoutes from "./routes/Routes";
import AppModal from "./components/Modal";
import Toast from "./components/Toast";
import useNotification from "./hooks/App/useNotification";

function App() {
  const modalRef = useModal();
  useUser();
  useTheme();
  useLanguage();
  useNotification();

  return (
    <>
      <AppModal ref={modalRef} />
      <Toast />

      <AppRoutes />
    </>
  );
}

export default App;
