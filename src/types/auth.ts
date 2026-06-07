//  Requests

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  role: "APOIADOR" | "CRIADOR";
}

//  Responses

export interface AuthResponse {
  token: string;
}

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  role: "APOIADOR" | "CRIADOR" | "ADMIN";
}