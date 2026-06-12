import { useState, useEffect, useRef, useCallback } from "react";
import {
  Loader2,
  Upload,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  KeyRound,
  FileText,
  FolderKanban,
  User,
  Mail,
  Landmark,
  Pencil,
  Trash2,
} from "lucide-react";
import { usePerfil } from "@/hooks/usePerfil";
import { useAuth } from "@/hooks/useAuth";
import {
  projetoService,
  type Projeto,
  type ProjetoUpdateRequest,
} from "@/services/projetoService";
import {
  atualizacaoService,
  type AtualizacaoProjeto,
} from "@/services/atualizacaoService";
import { PostarAtualizacaoForm } from "./postarAtualizacaoForm";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const inputClass =
  "w-full rounded-xl bg-[#141422] border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-300 mb-2";

function formatarDataCurta(data: string) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function ProjetoAprovadoCard({
  projeto,
  onSaved,
}: {
  projeto: Projeto;
  onSaved: () => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [descricao, setDescricao] = useState(projeto.descricao ?? "");
  const [capaUrl, setCapaUrl] = useState(projeto.capaUrl ?? "");
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    projeto.capaUrl ?? null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [atualizacoes, setAtualizacoes] = useState<AtualizacaoProjeto[]>([]);
  const [loadingAtualizacoes, setLoadingAtualizacoes] = useState(false);
  const [erroAtualizacoes, setErroAtualizacoes] = useState<string | null>(null);
  const [editandoAtualizacao, setEditandoAtualizacao] =
    useState<AtualizacaoProjeto | null>(null);
  const [excluindoId, setExcluindoId] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const carregarAtualizacoes = useCallback(async () => {
    setLoadingAtualizacoes(true);
    setErroAtualizacoes(null);

    try {
      const data = await atualizacaoService.listarPorProjeto(projeto.id);
      setAtualizacoes(data);
    } catch {
      setErroAtualizacoes("Erro ao carregar atualizações.");
    } finally {
      setLoadingAtualizacoes(false);
    }
  }, [projeto.id]);

  useEffect(() => {
    if (aberto) {
      carregarAtualizacoes();
    }
  }, [aberto, carregarAtualizacoes]);

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
        { method: "POST", body: formData },
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

  const handleExcluirAtualizacao = async (atualizacaoId: string) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta atualização?",
    );
    if (!confirmar) return;

    setExcluindoId(atualizacaoId);

    try {
      await atualizacaoService.deletar(projeto.id, atualizacaoId);
      if (editandoAtualizacao?.id === atualizacaoId) {
        setEditandoAtualizacao(null);
      }
      await carregarAtualizacoes();
    } catch {
      alert("Erro ao excluir atualização.");
    } finally {
      setExcluindoId(null);
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
            <img
              src={projeto.capaUrl}
              alt={projeto.titulo}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}

          <div className="text-left">
            <p className="text-sm font-semibold text-white">{projeto.titulo}</p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> Aprovado
            </p>
          </div>
        </div>

        {aberto ? (
          <ChevronUp className="w-4 h-4 text-white/40" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/40" />
        )}
      </button>

      {aberto && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
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
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

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
                onChange={(e) => {
                  setCapaUrl(e.target.value);
                  setBannerPreview(e.target.value || null);
                }}
                placeholder="Ou cole uma URL de imagem..."
                className={inputClass}
              />
            </div>
          </div>

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
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              {erro}
            </p>
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
              {salvando ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "SALVAR ALTERAÇÕES"
              )}
            </button>
          </div>

          <PostarAtualizacaoForm
            projetoId={projeto.id}
            atualizacao={editandoAtualizacao}
            onCancelEdit={() => setEditandoAtualizacao(null)}
            onPublicado={() => {
              setEditandoAtualizacao(null);
              carregarAtualizacoes();
            }}
          />

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#11111b] p-5">
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-purple-300 font-bold">
                Atualizações publicadas
              </p>
              <h4 className="mt-2 text-base font-bold text-white">
                Histórico de atualizações do projeto
              </h4>
            </div>

            {loadingAtualizacoes ? (
              <p className="text-sm text-white/40">
                Carregando atualizações...
              </p>
            ) : erroAtualizacoes ? (
              <p className="text-sm text-red-400">{erroAtualizacoes}</p>
            ) : atualizacoes.length === 0 ? (
              <p className="text-sm text-white/40">
                Nenhuma atualização foi publicada ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {atualizacoes.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-[#181826] p-4"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h5 className="text-sm font-bold text-white">
                          {item.titulo}
                        </h5>
                        <p className="mt-1 text-xs text-white/35">
                          {formatarDataCurta(item.publicadaEm)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.exclusiva && (
                          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-semibold text-yellow-300">
                            Exclusiva
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setEditandoAtualizacao(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => handleExcluirAtualizacao(item.id)}
                          disabled={excluindoId === item.id}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          {excluindoId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                          Excluir
                        </button>
                      </div>
                    </div>

                    {item.conteudoPublico && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/70">
                        {item.conteudoPublico}
                      </p>
                    )}

                    {item.exclusiva && item.conteudoExclusivo && (
                      <div className="mt-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300">
                          Conteúdo exclusivo
                        </p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/70">
                          {item.conteudoExclusivo}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjetoPendenteCard({ projeto }: { projeto: Projeto }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#161625] px-5 py-4 flex items-center gap-3">
      {projeto.capaUrl ? (
        <img
          src={projeto.capaUrl}
          alt={projeto.titulo}
          className="w-12 h-12 rounded-xl object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10" />
      )}

      <div>
        <p className="text-sm font-semibold text-white">{projeto.titulo}</p>
        <p className="text-xs text-yellow-400 flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          Aguardando aprovação
        </p>
      </div>
    </div>
  );
}

export function ProfileFormCriador() {
  const { usuario: usuarioAuth } = useAuth();
  const { usuario, perfil, loading, erro, atualizarUsuario, salvarPerfil } =
    usePerfil();

  const valoresOriginais = useRef({
    nome: "",
    bio: "",
    pixChave: "",
    contaBancaria: "",
  });

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [pixChave, setPixChave] = useState("");
  const [contaBancaria, setContaBancaria] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [projetosPendentes, setProjetosPendentes] = useState<Projeto[]>([]);
  const [projetosAprovados, setProjetosAprovados] = useState<Projeto[]>([]);
  const [loadingProjetos, setLoadingProjetos] = useState(true);

  useEffect(() => {
    if (usuario) {
      setDisplayName(usuario.nome ?? "");
      valoresOriginais.current.nome = usuario.nome ?? "";
    }

    if (perfil) {
      setBio(perfil.bio ?? "");
      setPixChave(perfil.pixChave ?? "");
      setContaBancaria(perfil.contaBancaria ?? "");

      valoresOriginais.current.bio = perfil.bio ?? "";
      valoresOriginais.current.pixChave = perfil.pixChave ?? "";
      valoresOriginais.current.contaBancaria = perfil.contaBancaria ?? "";
    } else {
      setBio("");
      setPixChave("");
      setContaBancaria("");

      valoresOriginais.current.bio = "";
      valoresOriginais.current.pixChave = "";
      valoresOriginais.current.contaBancaria = "";
    }
  }, [usuario, perfil]);

  const carregarProjetos = useCallback(async () => {
    if (!usuarioAuth?.id) return;

    setLoadingProjetos(true);

    try {
      const [pendentes, aprovados] = await Promise.allSettled([
        projetoService.listarPorCriador(usuarioAuth.id, "RASCUNHO"),
        projetoService.listarPorCriador(usuarioAuth.id, "PUBLICADO"),
      ]);

      if (pendentes.status === "fulfilled") {
        setProjetosPendentes(pendentes.value.content);
      }

      if (aprovados.status === "fulfilled") {
        setProjetosAprovados(aprovados.value.content);
      }
    } finally {
      setLoadingProjetos(false);
    }
  }, [usuarioAuth?.id]);

  useEffect(() => {
    carregarProjetos();
  }, [carregarProjetos]);

  const handleDiscard = () => {
    setDisplayName(valoresOriginais.current.nome);
    setBio(valoresOriginais.current.bio);
    setPixChave(valoresOriginais.current.pixChave);
    setContaBancaria(valoresOriginais.current.contaBancaria);
    setSucesso(false);
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);

    try {
      await atualizarUsuario({ nome: displayName });
      await salvarPerfil({ bio, pixChave, contaBancaria });

      valoresOriginais.current = {
        nome: displayName,
        bio,
        pixChave,
        contaBancaria,
      };

      setSucesso(true);
    } catch {
      alert("Erro ao salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b14] flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse">
          Carregando perfil...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-[#0b0b14] flex items-center justify-center">
        <p className="text-red-400 text-sm">{erro}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b14] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(122,47,255,0.18),rgba(255,0,153,0.10))] p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300 font-bold">
            Área do criador
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black italic tracking-tight text-white">
            MEU PERFIL
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Edite seus dados e gerencie todos os seus projetos em um só lugar.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-[#12121d] p-6 md:p-8">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300 font-bold">
              Informações do perfil
            </p>
            <h2 className="mt-2 text-xl font-bold text-white">
              Dados pessoais e financeiros
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                <User className="h-3.5 w-3.5" />
                Nome de exibição
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={inputClass}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Mail className="h-3.5 w-3.5" />
                E-mail
              </label>
              <input
                value={usuario?.email ?? ""}
                disabled
                className={`${inputClass} opacity-50 cursor-not-allowed`}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                <FileText className="h-3.5 w-3.5" />
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Descreva você e o que você cria..."
              />
            </div>

            <div>
              <label className={labelClass}>
                <KeyRound className="h-3.5 w-3.5" />
                Chave Pix
              </label>
              <input
                value={pixChave}
                onChange={(e) => setPixChave(e.target.value)}
                className={inputClass}
                placeholder="Informe sua chave Pix"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Landmark className="h-3.5 w-3.5" />
                Conta bancária
              </label>
              <input
                value={contaBancaria}
                onChange={(e) => setContaBancaria(e.target.value)}
                className={inputClass}
                placeholder="Banco, agência e conta"
              />
            </div>
          </div>

          {sucesso && (
            <p className="mt-5 text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
              Perfil atualizado com sucesso!
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-4 border-t border-white/5 pt-6">
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
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#12121d] p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300 font-bold">
                Meus projetos
              </p>
              <h2 className="mt-2 text-xl font-bold text-white flex items-center gap-2">
                <FolderKanban className="h-5 w-5 text-purple-300" />
                Gestão dos projetos
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Visualize projetos pendentes e edite os que já foram aprovados.
              </p>
            </div>
          </div>

          {loadingProjetos ? (
            <p className="text-white/30 text-sm animate-pulse">
              Carregando projetos...
            </p>
          ) : projetosPendentes.length === 0 &&
            projetosAprovados.length === 0 ? (
            <p className="text-white/30 text-sm">
              Você ainda não possui projetos cadastrados.
            </p>
          ) : (
            <div className="space-y-6">
              {projetosPendentes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                    Pendentes
                  </h3>
                  {projetosPendentes.map((p) => (
                    <ProjetoPendenteCard key={p.id} projeto={p} />
                  ))}
                </div>
              )}

              {projetosAprovados.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
                    Aprovados
                  </h3>
                  {projetosAprovados.map((p) => (
                    <ProjetoAprovadoCard
                      key={p.id}
                      projeto={p}
                      onSaved={carregarProjetos}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
