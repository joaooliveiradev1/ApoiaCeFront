import { useState, useRef } from "react";
import {
  ImageIcon,
  Lightbulb,
  Upload,
  ArrowRight,
  Save,
  Type,
  FileText,
  Target,
  Sparkles,
  Gamepad2,
} from "lucide-react";

// ── FooterSimple ────────────────────────────────────────────────────────────
function FooterSimple() {
  return (
    <footer className="w-full border-t border-[#2A2C3B] bg-[#0B0C14] py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            Apoia<span className="text-primary">Ce</span>
          </span>
          <span className="text-xs text-muted-foreground">
            © 2024 ApoiaCe. Built on the Neon Nexus.
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Support Hub</a>
          <a href="#" className="hover:text-white transition-colors">Brand Assets</a>
          <a href="#" className="hover:text-white transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
type CreateProjectProps = {
  onNext?: (data: {
    title: string;
    description: string;
    goal: string;
    bannerDataUrl: string | null;
  }) => void;
  onSaveDraft?: (data: {
    title: string;
    description: string;
    goal: string;
    bannerDataUrl: string | null;
  }) => void;
};

const MAX_DESC = 1500;
const MIN_DESC = 500;

// ── Page ─────────────────────────────────────────────────────────────────────
export function CreateProject({ onNext, onSaveDraft }: CreateProjectProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [bannerDataUrl, setBannerDataUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setBannerDataUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const formatGoal = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    const num = parseInt(digits, 10) / 100;
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const payload = { title, description, goal, bannerDataUrl };
  const descCount = description.length;
  const descPct = Math.min(100, (descCount / MIN_DESC) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">

      {/* CONTEÚDO */}
      <div className="flex-1">
        {/* HEADER */}
        <div className="border-b border-border/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <p className="text-xs uppercase tracking-[0.18em] text-primary/80 font-semibold mb-2">
              ApoiaCe Engine
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Detalhes do Projeto
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Conte sua história. Quanto melhor a apresentação, maior o engajamento.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* COLUNA PRINCIPAL */}
            <div className="lg:col-span-2 space-y-6">

              {/* DESCRIÇÃO */}
              <section
                className="rounded-2xl border border-border p-6"
                style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
              >
                <header className="flex items-center gap-2 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-base font-semibold">Descrição Detalhada</h2>
                </header>

                <label className="block text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Type className="h-3 w-3" />
                  Título do Projeto
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Revista Tormenta20 — Edição Especial"
                  className="w-full mb-5 rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                />

                {/* Toolbar fake */}
                <div className="flex items-center gap-1 rounded-t-lg bg-[#1B1C26] border border-b-0 border-border px-3 py-2 text-xs text-muted-foreground">
                  <button type="button" className="h-7 w-7 rounded hover:bg-secondary font-bold">B</button>
                  <button type="button" className="h-7 w-7 rounded hover:bg-secondary italic">I</button>
                  <button type="button" className="h-7 w-7 rounded hover:bg-secondary underline">U</button>
                  <span className="mx-2 h-4 w-px bg-border" />
                  <button type="button" className="h-7 px-2 rounded hover:bg-secondary">H1</button>
                  <button type="button" className="h-7 px-2 rounded hover:bg-secondary">H2</button>
                  <button type="button" className="h-7 px-2 rounded hover:bg-secondary">• Lista</button>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC))}
                  placeholder="Conte a história do seu projeto, seus objetivos e como os recursos serão utilizados..."
                  rows={9}
                  className="w-full rounded-b-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-3 text-sm placeholder:text-muted-foreground/60 resize-none transition"
                />

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Mínimo de {MIN_DESC} caracteres sugerido para melhor conversão.
                  </span>
                  <span className={`font-medium ${descCount >= MIN_DESC ? "text-primary" : "text-muted-foreground"}`}>
                    {descCount} / {MAX_DESC}
                  </span>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${descPct}%`,
                      background: "linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 50%, white))",
                    }}
                  />
                </div>
              </section>

              {/* GRID: BANNER + META */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* BANNER */}
                <section
                  className="rounded-2xl border border-border p-5"
                  style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
                >
                  <header className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Banner do Projeto</h3>
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </header>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="group relative w-full aspect-[16/9] rounded-xl border border-dashed border-border hover:border-primary/60 bg-[#1B1C26] hover:bg-[#252736] transition-all overflow-hidden flex items-center justify-center"
                  >
                    {bannerDataUrl ? (
                      <img src={bannerDataUrl} alt="Banner do projeto" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Click to upload (1920×1080)</span>
                      </div>
                    )}
                  </button>
                </section>

                {/* META */}
                <section
                  className="rounded-2xl border border-border p-5"
                  style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
                >
                  <header className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold">Meta de Financiamento</h3>
                    <Target className="h-4 w-4 text-primary" />
                  </header>

                  <label className="block text-xs text-muted-foreground mb-1.5">Valor (R$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={goal}
                      onChange={(e) => setGoal(formatGoal(e.target.value))}
                      placeholder="0,00"
                      className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    Defina uma meta realista. Você poderá adicionar metas estendidas na próxima etapa.
                  </p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-[11px] text-foreground/90">
                      Projetos com meta entre R$3k–R$15k têm maior taxa de sucesso.
                    </span>
                  </div>
                </section>
              </div>

              {/* AÇÕES */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNext?.(payload)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition shadow-[0_8px_24px_-8px_var(--primary)]"
                >
                  Próximo Passo
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSaveDraft?.(payload)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-border bg-[#1B1C26] hover:bg-[#252736] hover:border-primary/40 transition"
                >
                  <Save className="h-4 w-4" />
                  Salvar Rascunho
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center">
                Salvo automaticamente às 14:23
              </p>
            </div>

            {/* COLUNA LATERAL — apenas Dicas */}
            <aside>
              <section
                className="rounded-2xl border border-border p-5"
                style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
              >
                <header className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold">Dicas do Especialista</h3>
                </header>

                <ul className="space-y-3">
                  {[
                    "Projetos com vídeo têm 3x mais chances de atingir a meta.",
                    "Use imagens de alta qualidade no banner para passar mais credibilidade.",
                    "Divida seu texto em tópicos para facilitar a leitura rápida.",
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3 text-xs text-foreground/85 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <FooterSimple />
    </div>
  );
}