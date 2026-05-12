import api from "./api";
import type { UsuarioResponse, UsuarioUpdateRequest } from "../types/usuario";

export const usuarioService = {
  buscarPorId: async (id: string): Promise<UsuarioResponse> => {
    const response = await api.get<UsuarioResponse>(`/usuarios/${id}`);
    return response.data;
  },

  atualizar: async (
    id: string,
    data: UsuarioUpdateRequest,
  ): Promise<UsuarioResponse> => {
    const response = await api.put<UsuarioResponse>(`/usuarios/${id}`, data);
    return response.data;
  },

  deletar: async (id: string): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};
