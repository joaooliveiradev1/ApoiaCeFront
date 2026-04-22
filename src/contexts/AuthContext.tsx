import { createContext, useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import type {
  LoginRequest,
  RegisterRequest,
  UsuarioResponse,
} from "../types/auth";
import { jwtDecode } from "jwt-decode";

interface AuthContextData {
  usuario: UsuarioResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

interface JwtPayload {
  sub: string;
  role: string;
  id: number;
  nome: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [isLoading] = useState(true);

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
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
