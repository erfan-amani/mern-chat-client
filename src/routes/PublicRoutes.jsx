import { Route, Routes } from "react-router-dom";

const publicRoutes = [];

export const renderPublicRoutes = () =>
  publicRoutes.map(({ exact = false, path, component: Component }, i) => {
    return <Route key={i} exact={exact} path={path} element={<Component />} />;
  });

export default renderPublicRoutes;
