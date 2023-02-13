import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import HomeLayout from "./HomeLayout";

import ProtectedRoutes from "./ProtectedRoutes";

function AppRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default AppRoutes;
