import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageIcon, Lightbulb, Upload, ArrowRight, Save,
  Type, FileText, Target, Sparkles, Loader2,
} from "lucide-react";
import api from "../services/api";
import { categoriaService, type Categoria } from "../services/categoriaService";

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

const MAX_DESC = 1500;
const MIN_DESC = 500;

export function CreateProject() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [metaValor, setMetaValor] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [tipoAssinatura, setTipoAssinatura] = useState<"MENSAL" | "UNICA">("MENSAL");
  const [categoriaId, setCategoriaId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [capaUrl, setCapaUrl] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [bannerDataUrl, setBannerDataUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    categoriaService.listar().then(setCategorias);
  }, []);

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

  const parseGoal = (formatted: string): number => {
    return parseFloat(formatted.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const buildPayload = () => ({
    titulo,
    descricao,
    metaValor: parseGoal(metaValor),
    dataFim,
    tipoAssinatura,
    categoriaId,
    videoUrl: videoUrl || undefined,
    capaUrl: capaUrl || bannerDataUrl || undefined,
  });

  const handlePublish = async () => {
    setErro(null);
    if (!titulo) return setErro("Título é obrigatório.");
    if (!categoriaId) return setErro("Selecione uma categoria.");
    if (!metaValor) return setErro("Meta de financiamento é obrigatória.");
    if (!dataFim) return setErro("Data de encerramento é obrigatória.");

    setIsLoading(true);
    try {
      const { data } = await api.post<{ id: string }>("/projetos", buildPayload());
      await api.patch(`/projetos/${data.id}/status?status=PUBLICADO`);
      navigate("/home");
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 400) setErro("Dados inválidos. Verifique os campos.");
      else if (status === 403) setErro("Você não tem permissão para criar projetos.");
      else setErro("Erro ao criar projeto. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setErro(null);
    if (!titulo) return setErro("Título é obrigatório para salvar rascunho.");
    if (!categoriaId) return setErro("Selecione uma categoria.");
    if (!metaValor) return setErro("Meta de financiamento é obrigatória.");
    if (!dataFim) return setErro("Data de encerramento é obrigatória.");

    setIsSaving(true);
    try {
      await api.post("/projetos", buildPayload()); // já salva como RASCUNHO por padrão
      navigate("/home");
    } catch {
      setErro("Erro ao salvar rascunho.");
    } finally {
      setIsSaving(false);
    }
  };

  const descCount = descricao.length;
  const descPct = Math.min(100, (descCount / MIN_DESC) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div className="flex-1">
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
                  <Type className="h-3 w-3" /> Título do Projeto
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Revista Tormenta20 — Edição Especial"
                  className="w-full mb-5 rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                />

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
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value.slice(0, MAX_DESC))}
                  placeholder="Conte a história do seu projeto, seus objetivos e como os recursos serão utilizados..."
                  rows={9}
                  className="w-full rounded-b-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-3 text-sm placeholder:text-muted-foreground/60 resize-none transition"
                />

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Mínimo de {MIN_DESC} caracteres sugerido.
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

              {/* BANNER + META */}
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
                      <img src={bannerDataUrl} alt="Banner" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs font-medium">Click to upload (1920×1080)</span>
                      </div>
                    )}
                  </button>

                  <label className="block text-xs text-muted-foreground mt-3 mb-1.5">
                    Ou cole uma URL de imagem
                  </label>
                  <input
                    type="text"
                    value={capaUrl}
                    onChange={(e) => setCapaUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                  />
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
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={metaValor}
                      onChange={(e) => setMetaValor(formatGoal(e.target.value))}
                      placeholder="0,00"
                      className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                    />
                  </div>

                  <label className="block text-xs text-muted-foreground mb-1.5">Data de Encerramento</label>
                  <input
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm text-muted-foreground transition mb-4"
                  />

                  <label className="block text-xs text-muted-foreground mb-1.5">Tipo de Assinatura</label>
                  <select
                    value={tipoAssinatura}
                    onChange={(e) => setTipoAssinatura(e.target.value as "MENSAL" | "UNICA")}
                    className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm text-white transition mb-4"
                  >
                    <option value="MENSAL">Mensal</option>
                    <option value="UNICA">Única</option>
                  </select>

                  <label className="block text-xs text-muted-foreground mb-1.5">Categoria</label>
                  <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm text-white transition"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-[11px] text-foreground/90">
                      Projetos com meta entre R$3k–R$15k têm maior taxa de sucesso.
                    </span>
                  </div>
                </section>
              </div>

              {/* URL DO VÍDEO */}
              <section
                className="rounded-2xl border border-border p-5"
                style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
              >
                <label className="block text-xs text-muted-foreground mb-1.5">
                  URL do Vídeo (opcional)
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-lg bg-[#1B1C26] border border-border focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 transition"
                />
              </section>

              {/* ERRO */}
              {erro && (
                <p className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                  {erro}
                </p>
              )}

              {/* AÇÕES */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition shadow-[0_8px_24px_-8px_var(--primary)] disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ArrowRight className="h-4 w-4" /> Publicar Projeto</>}
                </button>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-border bg-[#1B1C26] hover:bg-[#252736] hover:border-primary/40 transition disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Salvar Rascunho</>}
                </button>
              </div>
            </div>

            {/* LATERAL */}
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

      <FooterSimple />
    </div>
  );
}