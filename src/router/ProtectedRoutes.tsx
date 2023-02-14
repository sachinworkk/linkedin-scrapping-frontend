import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/localStorage";

function ProtectedRoutes() {
  return Boolean(getToken("linkedInScrappingLiAt")) &&
    Boolean(getToken("linkedInScrappingJSessionId")) ? (
    <Navigate to={"/"} />
  ) : (
    <Outlet />
  );
}

export default ProtectedRoutes;
