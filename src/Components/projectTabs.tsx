import { useState } from "react";
import { BellRing } from "lucide-react";
import {
  atualizacaoService,
  type AtualizacaoProjeto,
} from "@/services/atualizacaoService";

interface ProjectTabsProps {
  projetoId: string;
  title: string;
  description: string;
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ProjectTabs({
  projetoId,
  title,
  description,
}: ProjectTabsProps) {
  const [abaAtiva, setAbaAtiva] = useState<"sobre" | "atualizacoes">("sobre");
  const [atualizacoes, setAtualizacoes] = useState<AtualizacaoProjeto[]>([]);
  const [loadingAtualizacoes, setLoadingAtualizacoes] = useState(false);
  const [erroAtualizacoes, setErroAtualizacoes] = useState<string | null>(null);

  const abrirSobre = () => {
    setAbaAtiva("sobre");
  };

  const abrirAtualizacoes = async () => {
    setAbaAtiva("atualizacoes");
    setLoadingAtualizacoes(true);
    setErroAtualizacoes(null);

    try {
      const data = await atualizacaoService.listarPorProjeto(projetoId);
      setAtualizacoes(data);
    } catch {
      setErroAtualizacoes("Erro ao carregar atualizações do projeto.");
    } finally {
      setLoadingAtualizacoes(false);
    }
  };

  return (
    <section className="mx-auto mt-4 w-full max-w-6xl px-4 pb-16 md:px-8">
      <div className="border-b border-white/10">
        <div className="flex items-center gap-8">
          <button
            onClick={abrirSobre}
            className={`pb-4 text-sm font-semibold transition-colors ${
              abaAtiva === "sobre"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-white/45 hover:text-white"
            }`}
          >
            Sobre o Projeto
          </button>

          <button
            onClick={abrirAtualizacoes}
            className={`pb-4 text-sm font-semibold transition-colors ${
              abaAtiva === "atualizacoes"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-white/45 hover:text-white"
            }`}
          >
            Atualizações
          </button>
        </div>
      </div>

      {abaAtiva === "sobre" && (
        <div className="pt-8">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-4 whitespace-pre-line text-base leading-7 text-white/75">
            {description}
          </p>
        </div>
      )}

      {abaAtiva === "atualizacoes" && (
        <div className="pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Atualizações do projeto
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Acompanhe novidades, progresso e comunicados publicados pelo
              criador.
            </p>
          </div>

          {loadingAtualizacoes ? (
            <p className="text-white/40">Carregando atualizações...</p>
          ) : erroAtualizacoes ? (
            <p className="text-red-400">{erroAtualizacoes}</p>
          ) : atualizacoes.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#12121d] p-6 text-white/45">
              Nenhuma atualização foi publicada ainda.
            </div>
          ) : (
            <div className="space-y-4">
              {atualizacoes.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-[#12121d] p-6"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                        <BellRing className="h-3.5 w-3.5" />
                        Atualização publicada
                      </div>

                      <h3 className="text-xl font-bold text-white">
                        {item.titulo}
                      </h3>

                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/35">
                        {formatarData(item.publicadaEm)}
                      </p>
                    </div>
                  </div>

                  {item.conteudoPublico && (
                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-white/75">
                      {item.conteudoPublico}
                    </p>
                  )}

                  {item.exclusiva && (
                    <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
                      Esta atualização possui conteúdo exclusivo para
                      apoiadores.
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
