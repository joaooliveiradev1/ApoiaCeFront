import { QrCode, Copy, Check, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

type PixPaymentProps = {
  onBack?: () => void;
};

export function PixPayment({ onBack }: PixPaymentProps) {
  const [name, setName] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const PIX_AMOUNT = 50;

  const pixPayload = useMemo(
    () =>
      `00020126360014BR.GOV.BCB.PIX0114apoiace@pix.br5204000053039865406${PIX_AMOUNT.toFixed(
        2
      )}5802BR5908Apoiace6009SAO PAULO62070503***6304`,
    []
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      
      {/* CONTEÚDO */}
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
              Pagamento via Pix
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Escaneie o QR Code ou copie o código abaixo para pagar
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
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold">Pagamento via Pix</h2>
            </div>

            <div className="grid md:grid-cols-[1fr_220px] gap-6 items-start">
              
              {/* FORM */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Preencha seus dados para identificação do pagamento.
                </p>

                <div>
                  <label className="text-xs text-muted-foreground">
                    Nome Completo
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome como no documento"
                    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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

                  <div>
                    <label className="text-xs text-muted-foreground">
                      Telefone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm"
                    />
                  </div>
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
              </div>

              {/* QR CODE */}
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl bg-white p-3">
                  <QRCodeSVG value={pixPayload} size={180} />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Aponte a câmera do seu banco
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}