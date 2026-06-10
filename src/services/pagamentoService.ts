import api from "./api";

export type CriarAssinaturaRequest = {
  projetoId: string;
  valor: number;
  anonima?: boolean;
  recorrente?: boolean;
};

export type AssinaturaResponse = {
  id: string;
  projetoId?: string;
  apoiadorId?: string;
  valor?: number;
  status?: string;
};

export type GerarCobrancaRequest = {
  assinaturaId: string;
};

export type PagamentoResponse = {
  id: string;
  status: string;
  valorPago: number;
  meioPagamento: string | null;
  competencia: string | null;
  dataPagamento: string | null;
  criadoEm: string;
  qrCode?: string;
  qrCodeBase64?: string;
};

export async function criarAssinatura(
  payload: CriarAssinaturaRequest,
): Promise<AssinaturaResponse> {
  const response = await api.post<AssinaturaResponse>("/assinaturas", {
    projetoId: payload.projetoId,
    valor: payload.valor,
    anonima: payload.anonima ?? false,
    recorrente: payload.recorrente ?? false,
  });

  return response.data;
}

export async function gerarCobrancaPix(
  payload: GerarCobrancaRequest,
): Promise<PagamentoResponse> {
  const response = await api.post<PagamentoResponse>("/pagamentos/gerar", {
    assinaturaId: payload.assinaturaId,
  });

  return response.data;
}

export async function criarAssinaturaEGerarPix(
  payload: CriarAssinaturaRequest,
) {
  const assinatura = await criarAssinatura(payload);
  const pagamento = await gerarCobrancaPix({ assinaturaId: assinatura.id });

  return {
    assinatura,
    pagamento,
  };
}

export async function listarPagamentosPorAssinatura(
  assinaturaId: string,
): Promise<PagamentoResponse[]> {
  const response = await api.get<PagamentoResponse[]>(
    `/pagamentos/assinatura/${assinaturaId}`,
  );

  return response.data;
}
