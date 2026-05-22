import api from "./api";

export interface Projeto {
  id: string;
  titulo: string;
  criadorNome: string;
  categoriaNome: string;
  capaUrl: string;
  valorCaptado: number;
  metaValor: number;
  dataFim: string | null;
  qtdApoiadores: number;
  status: string;
}

export interface ProjetosPage {
  content: Projeto[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const projetoService = {
  listar: async (page = 0, size = 12): Promise<ProjetosPage> => {
    const response = await api.get<ProjetosPage>(`/projetos?page=${page}&size=${size}&status=PUBLICADO`);
    return response.data;
  },
};