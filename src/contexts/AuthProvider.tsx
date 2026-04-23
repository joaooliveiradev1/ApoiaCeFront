import { useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { authService } from "../services/authService";
import type {
  LoginRequest,
  RegisterRequest,
  UsuarioResponse,
} from "../types/auth";

interface JwtPayload {
  sub: string;
  role: string;
  id: number;
  nome: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [usuario, setUsuario] = useState<UsuarioResponse | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      return {
        id: decoded.id,
        nome: decoded.nome,
        email: decoded.sub,
        role: decoded.role as UsuarioResponse["role"],
      };
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);
    const decoded = jwtDecode<JwtPayload>(response.token);
    localStorage.setItem("token", response.token);
    setToken(response.token);
    setUsuario({
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.sub,
      role: decoded.role as UsuarioResponse["role"],
    });
  };

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data);
    const decoded = jwtDecode<JwtPayload>(response.token);
    localStorage.setItem("token", response.token);
    setToken(response.token);
    setUsuario({
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.sub,
      role: decoded.role as UsuarioResponse["role"],
    });
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated: !!token,
        isLoading: false,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
