import { FooterSimple } from "@/Components/footerSimple";
import { QrCode, CreditCard, Lock, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function ChoicePayment() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handlePix = () => {
    if (!id) return;
    navigate(`/pagamento-pix/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="flex items-center justify-center p-4 flex-1">
        <div className="w-full max-w-2xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Finalizar Apoio
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Escolha como deseja concluir seu apoio
            </p>
          </header>

          <div
            className="rounded-2xl border border-border p-6"
            style={{
              background: "var(--gradient-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2 className="text-base font-semibold mb-1">
              Escolha o Método de Pagamento
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              No momento, o pagamento via Pix já está disponível para concluir
              seu apoio com aprovação rápida.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handlePix}
                className="relative flex flex-col gap-3 rounded-xl border border-border bg-[#1B1C26] hover:bg-[#252736] hover:border-primary/60 transition-all duration-200 hover:scale-[1.02] p-5 text-left group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-[#0f2f3a] border border-border flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary transition-transform duration-200 group-hover:translate-x-1" />
                </div>

                <div>
                  <p className="font-semibold text-white">Pix</p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Aprovação rápida via QR Code ou código copia e cola.
                  </p>
                </div>

                <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Disponível agora
                </span>
              </button>

              <button
                type="button"
                disabled
                className="relative flex flex-col gap-3 rounded-xl border border-border bg-[#15161d] opacity-60 cursor-not-allowed p-5 text-left"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-[#20222c] border border-border flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-white">Cartão</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Em breve. Este método ainda não está disponível nesta
                    versão.
                  </p>
                </div>

                <span className="absolute -top-2.5 left-4 rounded-full bg-gray-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  Em breve
                </span>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Todas as transações são seguras e criptografadas
            </div>
          </div>
        </div>
      </div>

      <FooterSimple />
    </div>
  );
}
