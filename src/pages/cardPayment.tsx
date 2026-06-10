import { CreditCard, ArrowLeft, Clock3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function CardPayment() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
              Pagamento com Cartão
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Este método ainda não está disponível nesta versão
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
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold">Cartão em breve</h2>
            </div>

            <div className="rounded-2xl border border-border bg-[#1B1C26] p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#232533] border border-border">
                  <Clock3 className="h-7 w-7 text-primary" />
                </div>
              </div>

              <p className="text-base font-semibold text-white">
                Pagamento com cartão ainda não liberado
              </p>

              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                No momento, o apoio está disponível via Pix. O fluxo com cartão
                será habilitado em uma próxima etapa da integração.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() =>
                    navigate(id ? `/pagamento-pix/${id}` : "/home")
                  }
                  className="rounded-xl px-5 py-3 font-semibold text-white bg-primary hover:scale-[1.02] transition"
                >
                  Pagar com Pix
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="rounded-xl px-5 py-3 font-semibold border border-border bg-[#1B1C26] hover:bg-[#252736] transition"
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
