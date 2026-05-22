import api from "./api";

export interface Categoria {
  id: string;
  nome: string;
  cor?: string;
}

export const categoriaService = {
  listar: async (): Promise<Categoria[]> => {
    const response = await api.get<Categoria[]>("/categorias");
    return response.data;
  },
};
