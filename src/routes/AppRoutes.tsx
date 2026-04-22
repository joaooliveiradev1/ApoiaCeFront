import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../pages/sign_in";
import { SignUp } from "../pages/sign_up";
import { PreMenu } from "../pages/pre_menu";
import type { JSX } from "react";

function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreMenu />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
