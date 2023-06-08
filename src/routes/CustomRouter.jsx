import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children, ...rest }) => {
  const isAuthorized = useSelector(state => !!state.auth.user);

  return isAuthorized ? (
    children
  ) : (
    <Navigate to={{ pathname: "/auth/register" }} />
  );
};

export const AuthRoute = ({ children, ...rest }) => {
  const isAuthorized = useSelector(state => !!state.auth.user);

  return isAuthorized ? <Navigate to={{ pathname: "/chat" }} /> : children;
};
