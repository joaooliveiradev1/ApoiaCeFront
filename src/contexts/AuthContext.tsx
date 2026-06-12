import { createContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";
import type {
  LoginRequest,
  RegisterRequest,
  UsuarioResponse,
} from "../types/auth";

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
  id: string | number;
  nome: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextData);

function extrairUsuarioDoToken(token: string): UsuarioResponse | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return {
      id: String(decoded.id),
      nome: decoded.nome,
      email: decoded.sub,
      role: decoded.role as UsuarioResponse["role"],
    };
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [usuario, setUsuario] = useState<UsuarioResponse | null>(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;

    return extrairUsuarioDoToken(storedToken);
  });

  const [isLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);

    localStorage.setItem("token", response.token);
    setToken(response.token);
    setUsuario(extrairUsuarioDoToken(response.token));
  };

  const register = async (data: RegisterRequest) => {
    const response = await authService.register(data);

    localStorage.setItem("token", response.token);
    setToken(response.token);
    setUsuario(extrairUsuarioDoToken(response.token));
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated: !!token && !!usuario,
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
