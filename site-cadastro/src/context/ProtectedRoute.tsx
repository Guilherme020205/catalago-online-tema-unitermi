import { Navigate } from "react-router-dom";
import { useContext} from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
