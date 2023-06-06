import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "./CustomRouter";

import Register from "../pages/Auth/Register";

const authRoutes = [{ path: "/auth/register", component: Register }];

export const AuthRoutes = () => (
  <Routes>
    {authRoutes.map(({ exact = false, path, component: Component }, i) => {
      return (
        <Route
          key={i}
          exact={exact}
          path={path}
          element={
            <AuthRoute>
              <Component />
            </AuthRoute>
          }
        />
      );
    })}
  </Routes>
);

export default AuthRoutes;
