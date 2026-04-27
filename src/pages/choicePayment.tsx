import { QrCode, CreditCard, Lock, ArrowRight } from "lucide-react";
import { FooterSimple } from "../Components/footerSimple"; // importa o footer

type PreMenuProps = {
  projectTitle?: string;
  onSelectPix?: () => void;
  onSelectCartao?: () => void;
};

export function ChoicePayment({
  projectTitle = "Revista Tormenta20",
  onSelectPix,
  onSelectCartao,
}: PreMenuProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex items-center justify-center p-4 flex-1">
        <div className="w-full max-w-2xl">
          
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Finalizar Apoio
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Você está apoiando{" "}
              <span className="text-primary font-medium">{projectTitle}</span>
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
              Selecione abaixo a forma como deseja concluir seu apoio.
            </p>

            <div className="grid grid-cols-2 gap-4">
              
              {/* PIX */}
              <button
                onClick={onSelectPix}
                className="relative flex flex-col gap-3 rounded-xl border border-border 
                bg-[#1B1C26] hover:bg-[#252736]
                hover:border-primary/60 transition-all duration-200 
                hover:scale-[1.02] p-5 text-left group"
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
                    Aprovação instantânea via QR Code ou copia e cola.
                  </p>
                </div>

                <span className="absolute -top-2.5 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Recomendado
                </span>
              </button>

              {/* CARTÃO */}
              <button
                onClick={onSelectCartao}
                className="flex flex-col gap-3 rounded-xl border border-border 
                bg-[#1B1C26] hover:bg-[#252736] 
                hover:border-primary/60 transition-all duration-200 
                hover:scale-[1.02] p-5 text-left group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-lg bg-[#0f2f3a] border border-border flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-primary transition-transform duration-200 group-hover:translate-x-1" />
                </div>

                <div>
                  <p className="font-semibold text-white">Cartão</p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Pague em até 6x sem juros no cartão de crédito.
                  </p>
                </div>
              </button>

            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Todas as transações são seguras e criptografadas
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <FooterSimple />
    </div>
  );
}