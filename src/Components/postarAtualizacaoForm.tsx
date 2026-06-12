import { useEffect, useState } from "react";
import { BellPlus, Loader2, PencilLine, X } from "lucide-react";
import {
  atualizacaoService,
  type AtualizacaoProjeto,
  type AtualizacaoRequest,
} from "@/services/atualizacaoService";

interface PostarAtualizacaoFormProps {
  projetoId: string;
  atualizacao?: AtualizacaoProjeto | null;
  onPublicado?: () => void;
  onCancelEdit?: () => void;
}

const inputClass =
  "w-full rounded-xl bg-[#141422] border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-[0.18em] text-purple-300 mb-2";

export function PostarAtualizacaoForm({
  projetoId,
  atualizacao,
  onPublicado,
  onCancelEdit,
}: PostarAtualizacaoFormProps) {
  const [titulo, setTitulo] = useState("");
  const [conteudoPublico, setConteudoPublico] = useState("");
  const [conteudoExclusivo, setConteudoExclusivo] = useState("");
  const [exclusiva, setExclusiva] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const modoEdicao = !!atualizacao;

  useEffect(() => {
    if (atualizacao) {
      setTitulo(atualizacao.titulo ?? "");
      setConteudoPublico(atualizacao.conteudoPublico ?? "");
      setConteudoExclusivo(atualizacao.conteudoExclusivo ?? "");
      setExclusiva(atualizacao.exclusiva ?? false);
      setSucesso(false);
      setErro(null);
    } else {
      setTitulo("");
      setConteudoPublico("");
      setConteudoExclusivo("");
      setExclusiva(false);
    }
  }, [atualizacao]);

  const limparFormulario = () => {
    setTitulo("");
    setConteudoPublico("");
    setConteudoExclusivo("");
    setExclusiva(false);
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    try {
      const payload: AtualizacaoRequest = {
        titulo,
        conteudoPublico,
        conteudoExclusivo: exclusiva
          ? conteudoExclusivo || undefined
          : undefined,
        exclusiva,
      };

      if (modoEdicao && atualizacao) {
        await atualizacaoService.atualizar(projetoId, atualizacao.id, payload);
      } else {
        await atualizacaoService.criar(projetoId, payload);
        limparFormulario();
      }

      setSucesso(true);
      onPublicado?.();

      if (modoEdicao) {
        onCancelEdit?.();
      }
    } catch {
      setErro(
        modoEdicao
          ? "Erro ao atualizar atualização."
          : "Erro ao publicar atualização.",
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#11111b] p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-purple-300 font-bold">
            Atualizações
          </p>
          <h4 className="mt-2 flex items-center gap-2 text-base font-bold text-white">
            {modoEdicao ? (
              <>
                <PencilLine className="h-4 w-4 text-blue-300" />
                Editar atualização
              </>
            ) : (
              <>
                <BellPlus className="h-4 w-4 text-purple-300" />
                Postar nova atualização
              </>
            )}
          </h4>
        </div>

        {modoEdicao && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Cancelar
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={inputClass}
            placeholder="Ex: Nova etapa concluída"
          />
        </div>

        <div>
          <label className={labelClass}>Conteúdo público</label>
          <textarea
            value={conteudoPublico}
            onChange={(e) => setConteudoPublico(e.target.value)}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Escreva a atualização que todos poderão ver..."
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <input
            id={`exclusiva-${projetoId}`}
            type="checkbox"
            checked={exclusiva}
            onChange={(e) => setExclusiva(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-transparent"
          />
          <label
            htmlFor={`exclusiva-${projetoId}`}
            className="text-sm text-white/75"
          >
            Esta atualização possui parte exclusiva para apoiadores
          </label>
        </div>

        {exclusiva && (
          <div>
            <label className={labelClass}>Conteúdo exclusivo</label>
            <textarea
              value={conteudoExclusivo}
              onChange={(e) => setConteudoExclusivo(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Conteúdo visível apenas para apoiadores..."
            />
          </div>
        )}

        {erro && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            {erro}
          </p>
        )}

        {sucesso && (
          <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
            {modoEdicao
              ? "Atualização editada com sucesso!"
              : "Atualização publicada com sucesso!"}
          </p>
        )}

        <div className="flex justify-end gap-3">
          {modoEdicao && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-white/70 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
          )}

          <button
            onClick={handleSalvar}
            disabled={salvando || titulo.trim() === ""}
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {salvando ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {modoEdicao ? "Salvando..." : "Publicando..."}
              </span>
            ) : modoEdicao ? (
              "Salvar atualização"
            ) : (
              "Publicar atualização"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
