import { Space } from "@mantine/core";
import {
  Link,
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";

function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

const Root = () => {
  return (
    <>
      <div>
        <Link to="/">Home Page</Link>
        <Space />
        <Link to="/login">Login</Link>
      </div>

      <Outlet />
    </>
  );
};
export default AppRoutes;
