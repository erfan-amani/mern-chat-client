import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { AuthRoute, PrivateRoute } from "./CustomRouter";
import Chat from "@/pages/Chat";
import UserProfile from "@/pages/Chat/components/UserProfile";
import Auth from "@/pages/Auth/Auth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Messages from "@/pages/Chat/components/Messages";

const AppRoutes = ({ children }) => {
  const isAuthorized = useSelector(state => !!state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        {children}

        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        >
          <Route path="user/:userId" element={<UserProfile />} />
          <Route path="message/:roomId" element={<Messages />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthorized ? "/chat" : "/auth/register"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
