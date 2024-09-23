import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./auth.js";

const ProtectedRoute = ({ element }) => {
  return isUserLoggedIn() ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
