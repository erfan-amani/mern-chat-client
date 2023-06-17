import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { AuthRoute, PrivateRoute } from "./CustomRouter";
import Chat from "@/pages/Chat";
import Request from "@/pages/Chat/components/Request";
import Auth from "@/pages/Auth/Auth";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import SendMessage from "../pages/Chat/components/SendMessage";

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
          <Route path="request" element={<Request />} />
          <Route path="room" element={<div>index2</div>}>
            <Route path="user" element={<Request />} />
            <Route path="channel" element={<Request />} />
          </Route>

          <Route path="*" element={<SendMessage />} />
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
