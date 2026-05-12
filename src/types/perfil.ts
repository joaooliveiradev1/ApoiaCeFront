export interface PerfilUsuarioResponse {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  email: string;
  bio?: string;
  pixChave?: string;
  contaBancaria?: string;
  criadoEm: string;
  atualizadoEm: string;
}

// O que enviamos — POST e PATCH /perfil
export interface PerfilUsuarioRequest {
  bio?: string;
  pixChave?: string;
  contaBancaria?: string;
}
