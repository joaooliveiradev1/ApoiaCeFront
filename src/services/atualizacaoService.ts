import api from "./api";

export interface AtualizacaoProjeto {
  id: string;
  projetoId: string;
  titulo: string;
  conteudoPublico: string;
  conteudoExclusivo?: string;
  exclusiva: boolean;
  publicadaEm: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface AtualizacaoRequest {
  titulo: string;
  conteudoPublico?: string;
  conteudoExclusivo?: string;
  exclusiva: boolean;
  publicadaEm?: string;
}

export const atualizacaoService = {
  listarPorProjeto: async (
    projetoId: string,
  ): Promise<AtualizacaoProjeto[]> => {
    const response = await api.get<AtualizacaoProjeto[]>(
      `/projetos/${projetoId}/atualizacoes`,
    );
    return response.data;
  },

  criar: async (
    projetoId: string,
    data: AtualizacaoRequest,
  ): Promise<AtualizacaoProjeto> => {
    const response = await api.post<AtualizacaoProjeto>(
      `/projetos/${projetoId}/atualizacoes`,
      data,
    );
    return response.data;
  },

  atualizar: async (
    projetoId: string,
    atualizacaoId: string,
    data: AtualizacaoRequest,
  ): Promise<AtualizacaoProjeto> => {
    const response = await api.put<AtualizacaoProjeto>(
      `/projetos/${projetoId}/atualizacoes/${atualizacaoId}`,
      data,
    );
    return response.data;
  },

  deletar: async (projetoId: string, atualizacaoId: string): Promise<void> => {
    await api.delete(`/projetos/${projetoId}/atualizacoes/${atualizacaoId}`);
  },
};
