import api from "./api";

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  criadorNome: string;
  categoriaId: string;
  categoriaNome: string;
  capaUrl: string;
  valorCaptado: number;
  metaValor: number;
  dataFim: string | null;
  qtdApoiadores: number;
  videoUrl: string | null;
  status: string;
  tipoAssinatura: "MENSAL" | "UNICA";
}

export interface ProjetosPage {
  content: Projeto[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export interface ProjetoUpdateRequest {
  titulo: string;
  descricao?: string;
  metaValor: number;
  dataFim: string;
  tipoAssinatura: "MENSAL" | "UNICA";
  categoriaId: string;
  videoUrl?: string;
  capaUrl?: string;
}

export const projetoService = {
  listar: async (
    page = 0,
    size = 12,
    categoriaId?: string,
    titulo?: string
  ): Promise<ProjetosPage> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("size", String(size));
    params.append("status", "PUBLICADO");
    if (titulo) params.append("titulo", titulo);
    if (categoriaId) params.append("categoriaId", categoriaId);
    const response = await api.get<ProjetosPage>(`/projetos?${params.toString()}`);
    return response.data;
  },

  buscarPorId: async (id: string): Promise<Projeto> => {
    const response = await api.get<Projeto>(`/projetos/${id}`);
    return response.data;
  },

  listarPorCriador: async (
    criadorId: string,
    status?: string,
    page = 0,
    size = 50
  ): Promise<ProjetosPage> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("size", String(size));
    if (status) params.append("status", status);
    const response = await api.get<ProjetosPage>(
      `/projetos/criador/${criadorId}?${params.toString()}`
    );
    return response.data;
  },

  atualizar: async (
    id: string,
    data: ProjetoUpdateRequest
  ): Promise<Projeto> => {
    const response = await api.put<Projeto>(`/projetos/${id}`, data);
    return response.data;
  },
};