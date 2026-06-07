import api from "./api";
import type { Projeto, ProjetosPage } from "./projetoService";

export const ProjetoAdminService = {
  /**
   * Lista projetos para o Admin permitindo filtrar por status (ex: RASCUNHO) 
   * e trazendo um tamanho de página maior se desejado.
   */
  listarProjetosAdmin: async (
    status?: "RASCUNHO" | "PUBLICADO" | "PAUSADO" | "ENCERRADO",
    page = 0,
    size = 100 // Trazemos bastante dados para o painel gerenciar
  ): Promise<ProjetosPage> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("size", String(size));
    
    if (status) {
      params.append("status", status);
    }

    const response = await api.get<ProjetosPage>(`/projetos?${params.toString()}`);
    return response.data;
  },

  /**
   * Atualiza o status do projeto através do PatchMapping do Spring (?status=X)
   */
  atualizarStatus: async (
    id: string, 
    novoStatus: "RASCUNHO" | "PUBLICADO" | "PAUSADO" | "ENCERRADO"
  ): Promise<Projeto> => {
    const response = await api.patch<Projeto>(`/projetos/${id}/status`, null, {
      params: { status: novoStatus }
    });
    return response.data;
  },

  /**
   * Deleta (soft-delete) o projeto permanentemente
   */
  deletarProjeto: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`);
  }
};