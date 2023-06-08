import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import renderPrivateRoutes from "./PrivateRoutes";
import renderPublicRoutes from "./PublicRoutes";
import renderAuthRoutes from "./AuthRoutes";
import { useSelector } from "react-redux";

const AppRoutes = ({ children }) => {
  const isAuthorized = useSelector(state => !!state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {children}

        {/* <Routes>
        <Route path="*" element={<Navbar />} />
      </Routes> */}

        {renderPublicRoutes()}
        {renderAuthRoutes()}
        {renderPrivateRoutes()}

        {/* <Routes>
        <Route path="*" element={<Footer />} />
      </Routes> */}

        <Route
          path="*"
          element={<Navigate to={isAuthorized ? "/chat" : "/auth/register"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
