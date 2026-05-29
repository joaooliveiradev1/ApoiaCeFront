import api from "./api";

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  criadorNome: string;
  categoriaNome: string;
  capaUrl: string;
  valorCaptado: number;
  metaValor: number;
  dataFim: string | null;
  qtdApoiadores: number;
  videoUrl: string | null;
  status: string;
}

export interface ProjetosPage {
  content: Projeto[];
  totalPages: number;
  totalElements: number;
  number: number;
}

export const projetoService = {
  listar: async (
    page = 0,
    size = 12,
    categoriaNome?: string,
    titulo?: string
  ): Promise<ProjetosPage> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("size", String(size));
    params.append("status", "PUBLICADO");
    if (titulo) params.append("titulo", titulo);

    const response = await api.get<ProjetosPage>(`/projetos?${params.toString()}`);

    let content = response.data.content;

    if (categoriaNome) {
      content = content.filter(
        (p) => p.categoriaNome.toLowerCase() === categoriaNome.toLowerCase()
      );
    }

    return { ...response.data, content };
  },

  buscarPorId: async (id: string): Promise<Projeto> => {
    const response = await api.get<Projeto>(`/projetos/${id}`);
    return response.data;
  },
};