import useLanguage from "./hooks/App/useLanguage";
import useTheme from "./hooks/App/useTheme";
import useUser from "./hooks/App/useUser";
import AppRoutes from "./routes/Routes";

function App() {
  useUser();
  useTheme();
  useLanguage();

  return <AppRoutes />;
}

export default App;
