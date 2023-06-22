import useLanguage from "./hooks/App/useLanguage";
import useTheme from "./hooks/App/useTheme";
import useModal from "./hooks/App/useModal";
import useUser from "./hooks/App/useUser";
import AppRoutes from "./routes/Routes";
import AppModal from "./components/Modal";
import Toast from "./components/Toast";
import SocketContextProvider from "./context/socket/SocketContextProvider";

function App() {
  const modalRef = useModal();
  useUser();
  useTheme();
  useLanguage();

  return (
    <SocketContextProvider>
      <AppModal ref={modalRef} />
      <Toast />

      <AppRoutes />
    </SocketContextProvider>
  );
}

export default App;
