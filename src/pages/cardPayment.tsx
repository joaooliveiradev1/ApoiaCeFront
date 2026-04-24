import { CreditCard, ArrowLeft } from "lucide-react";
import { useState } from "react";

type CardPaymentProps = {
  onBack?: () => void;
};

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function CardPayment({ onBack }: CardPaymentProps) {
  const [amount, setAmount] = useState("");
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const [doc, setDoc] = useState("");

  const numericAmount = Number(amount.replace(",", ".")) || 0;

  const valid =
    numericAmount > 0 &&
    holder.trim().length > 2 &&
    number.replace(/\s/g, "").length >= 13 &&
    expiry.length === 5 &&
    cvv.length >= 3 &&
    doc.trim().length > 0;

  const handlePay = () => {
    if (!valid) return;
    alert(`Pagamento de R$ ${numericAmount.toFixed(2)} realizado!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">

          {/* VOLTAR */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          {/* HEADER */}
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pagamento com Cartão
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Informe os dados do cartão para finalizar seu apoio
            </p>
          </header>

          {/* CARD */}
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
              <h2 className="font-semibold">Dados do Cartão</h2>
            </div>

            <div className="space-y-4">

              {/* VALOR */}
              <div>
                <label className="text-xs text-muted-foreground">
                  Valor (R$)
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

              {/* NOME */}
              <div>
                <label className="text-xs text-muted-foreground">
                  Nome no cartão
                </label>
                <input
                  value={holder}
                  onChange={(e) => setHolder(e.target.value.toUpperCase())}
                  placeholder="NOME COMO NO CARTÃO"
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                />
              </div>

              {/* NÚMERO */}
              <div>
                <label className="text-xs text-muted-foreground">
                  Número do cartão
                </label>
                <input
                  value={number}
                  onChange={(e) =>
                    setNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="0000 0000 0000 0000"
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm font-mono"
                />
              </div>

              {/* DATA + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">
                    Validade
                  </label>
                  <input
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(formatExpiry(e.target.value))
                    }
                    placeholder="MM/AA"
                    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">
                    CVV
                  </label>
                  <input
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="123"
                    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* CPF */}
              <div>
                <label className="text-xs text-muted-foreground">
                  CPF / CNPJ
                </label>
                <input
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                  placeholder="000.000.000-00"
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                />
              </div>

              {/* PARCELAS */}
              <div>
                <label className="text-xs text-muted-foreground">
                  Parcelas
                </label>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}x {n === 1 ? "à vista" : "sem juros"}
                    </option>
                  ))}
                </select>
              </div>

              {/* BOTÃO */}
              <button
                onClick={handlePay}
                disabled={!valid}
                className="mt-4 w-full rounded-xl py-3 font-semibold text-white bg-primary hover:scale-[1.02] transition disabled:opacity-50"
              >
                Pagar com Cartão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}