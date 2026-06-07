import api from "./api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const authService = {
  debugger: true,

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  // 🛠️ NOVO: Método para a 1ª Etapa (Verificar e-mail e gerar código)
  solicitarTokenSenha: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/forgot-password", { email });
    return response.data;
  },

  // 🛠️ NOVO: Método para a 2ª Etapa (Validar código e trocar a senha)
  redefinirSenha: async (data: { email: string; token: string; novaSenha: string }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>("/auth/reset-password", data);
    return response.data;
  },
};