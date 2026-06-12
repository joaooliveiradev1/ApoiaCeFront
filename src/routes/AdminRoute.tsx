import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type AdminRouteProps = {
  children: JSX.Element;
};

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, usuario, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] text-white">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (usuario?.role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
