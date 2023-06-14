import useLanguage from "./hooks/App/useLanguage";
import useTheme from "./hooks/App/useTheme";
import useModal from "./hooks/App/useModal";
import useUser from "./hooks/App/useUser";
import AppRoutes from "./routes/Routes";
import AppModal from "./components/Modal";

function App() {
  const modalRef = useModal();
  useUser();
  useTheme();
  useLanguage();

  return (
    <>
      <AppModal ref={modalRef} />

      <AppRoutes />
    </>
  );
}

export default App;
