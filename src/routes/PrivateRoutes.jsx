import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import { PrivateRoute } from "./CustomRouter";

const privateRoutes = [{ path: "/chat", component: Chat }];

const renderPrivateRoutes = () =>
  privateRoutes.map(({ exact = false, path, component: Component }, i) => {
    return (
      <Route
        key={i}
        exact={exact}
        path={path}
        element={
          <PrivateRoute>
            <Component />
          </PrivateRoute>
        }
      />
    );
  });

export default renderPrivateRoutes;
