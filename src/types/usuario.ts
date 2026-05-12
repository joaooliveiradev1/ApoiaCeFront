// GET /usuarios/:id e PUT /usuarios/:id
export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  telefone?: string;
  role: "APOIADOR" | "CRIADOR" | "ADMIN";
  criadoEm: string;
}

// O que enviamos — PUT /usuarios/:id
export interface UsuarioUpdateRequest {
  nome?: string;
  telefone?: string;
  dataNascimento?: string; // "YYYY-MM-DD"
}
