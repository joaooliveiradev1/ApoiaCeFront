//  Requests

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

//  Responses

export interface AuthResponse {
  token: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  role: "APOIADOR" | "CRIADOR" | "ADMIN";
}
