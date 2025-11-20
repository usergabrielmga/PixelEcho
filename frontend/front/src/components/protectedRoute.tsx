import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getDashboardData } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (token) {
      getDashboardData(token)
        .then(() => setIsValid(true)) 
        .catch(() => setIsValid(false)); 
    } else {
      setIsValid(false);
    }
  }, [token]);

  if (isValid === null) {
    return <p>Carregando...</p>; 
  }

  if (!isValid) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}
