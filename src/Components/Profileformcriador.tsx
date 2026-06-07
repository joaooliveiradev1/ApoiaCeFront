import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, ImageIcon, Upload, ChevronDown, ChevronUp, Clock, CheckCircle2 } from "lucide-react";
import { usePerfil } from "@/hooks/usePerfil";
import { useAuth } from "@/hooks/useAuth";
import { projetoService, type Projeto, type ProjetoUpdateRequest } from "@/services/projetoService";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const inputClass =
  "w-full rounded-md bg-[#1a1a2e] border border-white/10 text-white text-sm px-3 py-2.5 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-purple-400 mb-1.5";

// ─── Seção de edição de projeto aprovado ─────────────────────────────────────
function ProjetoAprovadoCard({ projeto, onSaved }: { projeto: Projeto; onSaved: () => void }) {
  const [aberto, setAberto] = useState(false);
  const [descricao, setDescricao] = useState(projeto.descricao ?? "");
  const [capaUrl, setCapaUrl] = useState(projeto.capaUrl ?? "");
  const [bannerPreview, setBannerPreview] = useState<string | null>(projeto.capaUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setBannerPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    setErro(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Falha no upload");
      const data = await response.json();
      setCapaUrl(data.secure_url);
    } catch {
      setErro("Erro ao fazer upload da imagem.");
      setBannerPreview(projeto.capaUrl ?? null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);
    setErro(null);
    try {
      const payload: ProjetoUpdateRequest = {
        titulo: projeto.titulo,
        descricao,
        metaValor: projeto.metaValor,
        dataFim: projeto.dataFim ?? "",
        tipoAssinatura: projeto.tipoAssinatura ?? "MENSAL",
        categoriaId: projeto.categoriaId,
        videoUrl: projeto.videoUrl ?? undefined,
        capaUrl: capaUrl || undefined,
      };
      await projetoService.atualizar(projeto.id, payload);
      setSucesso(true);
      onSaved();
    } catch {
      setErro("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {projeto.capaUrl && (
            <img src={projeto.capaUrl} alt={projeto.titulo} className="w-10 h-10 rounded-lg object-cover" />
          )}
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{projeto.titulo}</p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Aprovado
            </p>
          </div>
        </div>
        {aberto ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>

      {aberto && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">

          {/* Foto */}
          <div>
            <label className={labelClass}>Foto do Projeto</label>
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
              disabled={isUploading}
              className="relative w-full aspect-[16/9] rounded-xl border border-dashed border-white/10 hover:border-purple-500/60 bg-[#0f0f1a] transition-all overflow-hidden flex items-center justify-center disabled:opacity-70"
            >
              {bannerPreview ? (
                <>
                  <img src={bannerPreview} alt="Banner" className="absolute inset-0 h-full w-full object-cover" />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                      <span className="text-xs text-white">Enviando...</span>
                    </div>
                  )}
                  {!isUploading && capaUrl && capaUrl !== projeto.capaUrl && (
                    <div className="absolute bottom-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
                      ✓ Nova imagem pronta
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/30">
                  <div className="h-10 w-10 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                    <Upload className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-xs">Clique para trocar a foto</span>
                </div>
              )}
            </button>
            <div className="mt-2">
              <input
                type="text"
                value={capaUrl}
                onChange={(e) => { setCapaUrl(e.target.value); setBannerPreview(e.target.value || null); }}
                placeholder="Ou cole uma URL de imagem..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className={labelClass}>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="Atualize a descrição do seu projeto..."
            />
          </div>

          {erro && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">{erro}</p>
          )}
          {sucesso && (
            <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
              Projeto atualizado com sucesso!
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSalvar}
              disabled={salvando || isUploading}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : "SALVAR ALTERAÇÕES"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function ProfileFormCriador() {
  const { usuario: usuarioAuth } = useAuth();
  const { usuario, loading, erro, atualizarUsuario } = usePerfil();

  const [displayName, setDisplayName] = useState("");
  const valoresOriginais = useRef({ nome: "" });
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [projetosPendentes, setProjetosPendentes] = useState<Projeto[]>([]);
  const [projetosAprovados, setProjetosAprovados] = useState<Projeto[]>([]);
  const [loadingProjetos, setLoadingProjetos] = useState(true);

  useEffect(() => {
    if (usuario) {
      setDisplayName(usuario.nome);
      valoresOriginais.current.nome = usuario.nome;
    }
  }, [usuario]);

  const carregarProjetos = useCallback(async () => {
    if (!usuarioAuth?.id) return;
    setLoadingProjetos(true);
    try {
      const [pendentes, aprovados] = await Promise.allSettled([
        projetoService.listarPorCriador(usuarioAuth.id, "RASCUNHO"),
        projetoService.listarPorCriador(usuarioAuth.id, "PUBLICADO"),
      ]);
      if (pendentes.status === "fulfilled") setProjetosPendentes(pendentes.value.content);
      if (aprovados.status === "fulfilled") setProjetosAprovados(aprovados.value.content);
    } finally {
      setLoadingProjetos(false);
    }
  }, [usuarioAuth?.id]);

  useEffect(() => {
    carregarProjetos();
  }, [carregarProjetos]);

  const handleDiscard = () => {
    setDisplayName(valoresOriginais.current.nome);
    setSucesso(false);
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);
    try {
      await atualizarUsuario({ nome: displayName });
      valoresOriginais.current.nome = displayName;
      setSucesso(true);
    } catch {
      alert("Erro ao salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse">Carregando perfil...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <p className="text-red-400 text-sm">{erro}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl space-y-10">

        <div>
          <h1 className="font-black text-3xl italic tracking-tight text-white md:text-4xl">
            MEU PERFIL
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Gerencie suas informações e seus projetos.
          </p>
        </div>

        {/* ── Seção 1: Dados pessoais ── */}
        <section className="bg-[#151525] p-6 rounded-xl border border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-5">
            Dados Pessoais
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Nome de exibição</label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className={labelClass}>E-mail</label>
                <input
                  value={usuario?.email ?? ""}
                  disabled
                  className={`${inputClass} opacity-40 cursor-not-allowed`}
                />
              </div>
            </div>

            {sucesso && (
              <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                Perfil atualizado com sucesso!
              </p>
            )}

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
              <button
                onClick={handleDiscard}
                disabled={salvando}
                className="text-sm text-white/40 transition-colors hover:text-white disabled:opacity-30"
              >
                Descartar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando || displayName.trim() === ""}
                className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {salvando ? "Salvando..." : "SALVAR ALTERAÇÕES"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Seção 2: Projetos pendentes ── */}
        <section className="bg-[#151525] p-6 rounded-xl border border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-1">
            Projetos Pendentes
          </h2>
          <p className="text-xs text-white/30 mb-5">
            Aguardando aprovação do administrador.
          </p>

          {loadingProjetos ? (
            <p className="text-white/30 text-sm animate-pulse">Carregando...</p>
          ) : projetosPendentes.length === 0 ? (
            <p className="text-white/30 text-sm">Nenhum projeto pendente.</p>
          ) : (
            <div className="space-y-3">
              {projetosPendentes.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 bg-[#1a1a2e] border border-white/10 rounded-xl px-5 py-4"
                >
                  {p.capaUrl && (
                    <img src={p.capaUrl} alt={p.titulo} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{p.titulo}</p>
                    <p className="text-xs text-yellow-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Aguardando aprovação
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Seção 3: Projetos aprovados ── */}
        <section className="bg-[#151525] p-6 rounded-xl border border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-1">
            Projetos Aprovados
          </h2>
          <p className="text-xs text-white/30 mb-5">
            Clique em um projeto para editar sua descrição e foto.
          </p>

          {loadingProjetos ? (
            <p className="text-white/30 text-sm animate-pulse">Carregando...</p>
          ) : projetosAprovados.length === 0 ? (
            <p className="text-white/30 text-sm">Nenhum projeto aprovado ainda.</p>
          ) : (
            <div className="space-y-3">
              {projetosAprovados.map((p) => (
                <ProjetoAprovadoCard
                  key={p.id}
                  projeto={p}
                  onSaved={carregarProjetos}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}