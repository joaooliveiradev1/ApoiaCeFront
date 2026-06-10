import { QrCode, Copy, Check, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import { criarAssinaturaEGerarPix } from "../services/pagamentoService";

interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  capaUrl: string;
  categoriaNome: string;
  criadorNome: string;
  valorCaptado: number;
  metaValor: number;
  dataFim: string;
  qtdApoiadores: number;
  videoUrl: string | null;
  status: string;
}

export function PixPayment() {
  const navigate = useNavigate();
  const { id: projetoId } = useParams<{ id: string }>();

  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [amount, setAmount] = useState("50,00");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [assinaturaId, setAssinaturaId] = useState<string | null>(null);
  const [pagamentoId, setPagamentoId] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState("");
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!projetoId) return;

    const carregarProjeto = async () => {
      try {
        const { data } = await api.get<Projeto>(`/projetos/${projetoId}`);
        setProjeto(data);

        if (data?.valorCaptado && Number(data.valorCaptado) > 0) {
          setAmount(Number(data.valorCaptado).toFixed(2).replace(".", ","));
        }
      } catch {
        setErro("Erro ao carregar dados do projeto.");
      }
    };

    carregarProjeto();
  }, [projetoId]);

  const numericAmount = useMemo(() => {
    return Number(amount.replace(/\./g, "").replace(",", ".")) || 0;
  }, [amount]);

  const qrImageSrc = useMemo(() => {
    if (!qrCodeBase64) return "";
    if (qrCodeBase64.startsWith("data:image")) return qrCodeBase64;
    return `data:image/png;base64,${qrCodeBase64}`;
  }, [qrCodeBase64]);

  const handleGerarPix = async () => {
    if (!projetoId || numericAmount <= 0) {
      setErro("Informe um valor válido para gerar o PIX.");
      return;
    }

    try {
      setIsLoading(true);
      setErro(null);

      const { assinatura, pagamento } = await criarAssinaturaEGerarPix({
        projetoId,
        valor: numericAmount,
        anonima: false,
        recorrente: false,
      });

      setAssinaturaId(assinatura.id);
      setPagamentoId(pagamento.id);
      setQrCode(pagamento.qrCode ?? "");
      setQrCodeBase64(pagamento.qrCodeBase64 ?? "");
      setStatus(pagamento.status ?? null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        if (statusCode === 400) {
          setErro("Não foi possível gerar o PIX. Verifique os dados enviados.");
        } else if (statusCode === 401) {
          setErro("Sua sessão expirou. Faça login novamente.");
        } else if (statusCode === 403) {
          setErro("Você não tem permissão para gerar esta cobrança.");
        } else {
          setErro("Erro ao gerar cobrança PIX. Tente novamente.");
        }
      } else {
        setErro("Erro inesperado ao gerar cobrança PIX.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!qrCode) return;

    await navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pagamento via Pix
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Gere o QR Code Pix para concluir seu apoio
            </p>
          </header>

          <div
            className="rounded-2xl border border-border p-6"
            style={{
              background: "var(--gradient-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2A2C3B] border border-border flex items-center justify-center">
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold">Pagamento via Pix</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Projeto</label>
                <input
                  value={projeto?.titulo ?? ""}
                  disabled
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm opacity-80"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">
                  Valor do apoio (R$)
                </label>
                <input
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/[^\d.,]/g, ""))
                  }
                  placeholder="50,00"
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm text-primary font-semibold"
                />
              </div>

              {!qrImageSrc && (
                <button
                  onClick={handleGerarPix}
                  disabled={isLoading || numericAmount <= 0}
                  className="mt-2 w-full rounded-xl py-3 font-semibold text-white bg-primary hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {isLoading ? "Gerando cobrança..." : "Gerar QR Code Pix"}
                </button>
              )}

              {erro && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                  {erro}
                </p>
              )}

              {qrImageSrc && (
                <div className="grid md:grid-cols-[1fr_220px] gap-6 items-start pt-2">
                  <div className="space-y-4">
                    <div className="rounded-xl border border-border bg-[#1B1C26] p-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        Código Pix copia e cola
                      </p>
                      <p className="text-sm break-all text-white/90">
                        {qrCode}
                      </p>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 rounded-lg border border-border bg-[#1B1C26] px-3 py-2 text-xs hover:bg-[#252736] transition"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? "Código copiado!" : "Copiar código Pix"}
                    </button>

                    <div className="rounded-xl border border-border bg-[#1B1C26] p-4 text-sm text-muted-foreground">
                      <p>
                        Status da cobrança:{" "}
                        <span className="font-semibold text-white">
                          {status ?? "PENDENTE"}
                        </span>
                      </p>
                      {assinaturaId && (
                        <p className="mt-1 break-all">
                          Assinatura:{" "}
                          <span className="text-white">{assinaturaId}</span>
                        </p>
                      )}
                      {pagamentoId && (
                        <p className="mt-1 break-all">
                          Pagamento:{" "}
                          <span className="text-white">{pagamentoId}</span>
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => navigate("/obrigado")}
                      className="mt-2 w-full rounded-xl py-3 font-semibold text-white bg-primary hover:scale-[1.02] transition"
                    >
                      Já realizei o pagamento
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="rounded-xl bg-white p-3">
                      <img
                        src={qrImageSrc}
                        alt="QR Code Pix para pagamento"
                        className="w-[180px] h-[180px] object-contain"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Escaneie com o app do seu banco
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
