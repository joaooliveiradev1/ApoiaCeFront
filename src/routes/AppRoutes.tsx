import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../pages/sign_in";
import { SignUp } from "../pages/sign_up";
import { ForgotPassword } from "../pages/forgotPassword"; // 🛠️ NOVO: Import da nova página
import { PreMenu } from "../pages/pre_menu";
import { AlterData } from "../pages/alterData";
import { CreateProject } from "../pages/createProject";
import { MainPage } from "../pages/main_page";
import { ProjectPage } from "../pages/projectPage";
import { CardPayment } from "../pages/cardPayment";
import { Thanks } from "../pages/thanks";
import { ChoicePayment } from "../pages/choicePayment";
import { PixPayment } from "../pages/pixPayment";
import { PageAdmin } from "../pages/pageAdmin";
import type { JSX } from "react";

function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/home" replace />;
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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
        {/* 🛠️ NOVO: Rota pública para recuperação de senha */}
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <AlterData />
            </PrivateRoute>
          }
        />
        <Route
          path="/criar-projeto"
          element={
            <PrivateRoute>
              <CreateProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/projeto/:id"
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagamento/:id"
          element={
            <PrivateRoute>
              <CardPayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/obrigado"
          element={
            <PrivateRoute>
              <Thanks />
            </PrivateRoute>
          }
        />
        <Route
          path="/escolha-pagamento/:id"
          element={
            <PrivateRoute>
              <ChoicePayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagamento-pix/:id"
          element={
            <PrivateRoute>
              <PixPayment />
            </PrivateRoute>
          }
        />
        <Route path="/admin" element={<PageAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}