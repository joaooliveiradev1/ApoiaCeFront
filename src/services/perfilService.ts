import api from "./api";
import type {
  PerfilUsuarioResponse,
  PerfilUsuarioRequest,
} from "../types/perfil";

export const perfilService = {
  buscar: async (): Promise<PerfilUsuarioResponse> => {
    const response = await api.get<PerfilUsuarioResponse>("/perfil");
    return response.data;
  },

  criar: async (data: PerfilUsuarioRequest): Promise<PerfilUsuarioResponse> => {
    const response = await api.post<PerfilUsuarioResponse>("/perfil", data);
    return response.data;
  },

  atualizar: async (
    data: PerfilUsuarioRequest,
  ): Promise<PerfilUsuarioResponse> => {
    const response = await api.patch<PerfilUsuarioResponse>("/perfil", data);
    return response.data;
  },

  deletar: async (): Promise<void> => {
    await api.delete("/perfil");
  },
};
