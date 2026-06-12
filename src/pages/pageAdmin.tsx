import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gamepad2,
  ShieldCheck,
  Clock,
  List,
  Check,
  X,
  LogOut,
  Trash2,
  Ban,
  Search,
  RefreshCw,
  FolderKanban,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { ProjetoAdminService } from "../services/projetoAdminService";
import type { Projeto } from "../services/projetoService";
import { useAuth } from "../hooks/useAuth";

type FiltroStatus =
  | "TODOS"
  | "RASCUNHO"
  | "PUBLICADO"
  | "PAUSADO"
  | "ENCERRADO";

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    RASCUNHO: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    PUBLICADO:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    PAUSADO: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    ENCERRADO: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
  };

  const label: Record<string, string> = {
    RASCUNHO: "Rascunho",
    PUBLICADO: "Publicado",
    PAUSADO: "Pausado",
    ENCERRADO: "Encerrado",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${map[status] ?? "bg-white/5 text-white/70 border border-white/10"}`}
    >
      {label[status] ?? status}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  tone = "default",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  tone?: "default" | "warning" | "success";
}) {
  const toneClass =
    tone === "warning"
      ? "from-amber-500/10 to-transparent border-amber-500/15"
      : tone === "success"
        ? "from-emerald-500/10 to-transparent border-emerald-500/15"
        : "from-violet-500/10 to-transparent border-white/10";

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${toneClass} bg-[#151518] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-white/55">{title}</p>
        <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

export function PageAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [todos, setTodos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("TODOS");
  const [erro, setErro] = useState("");

  const scrollbarCustomClass =
    "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20";

  async function carregarDadosDoPainel(exibirLoader = true) {
    try {
      setErro("");
      if (exibirLoader) setLoading(true);
      else setRefreshing(true);

      const response = await ProjetoAdminService.listarProjetosAdmin();
      setTodos(response.content);
    } catch (error) {
      console.error("Erro ao carregar dados do painel:", error);
      setErro("Não foi possível sincronizar os dados com o backend.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    carregarDadosDoPainel();
  }, []);

  async function handleAprovar(id: string) {
    try {
      await ProjetoAdminService.atualizarStatus(id, "PUBLICADO");
      await carregarDadosDoPainel(false);
    } catch (error) {
      console.error("Erro ao aprovar projeto:", error);
      alert("Falha ao aprovar o projeto.");
    }
  }

  async function handleRecusar(id: string) {
    try {
      await ProjetoAdminService.atualizarStatus(id, "ENCERRADO");
      await carregarDadosDoPainel(false);
    } catch (error) {
      console.error("Erro ao recusar projeto:", error);
      alert("Falha ao recusar o projeto.");
    }
  }

  async function handleEncerrar(id: string) {
    if (
      !confirm(
        "Tem certeza que deseja ENCERRAR este projeto? Esta ação pode impactar a visualização pública.",
      )
    ) {
      return;
    }

    try {
      await ProjetoAdminService.atualizarStatus(id, "ENCERRADO");
      await carregarDadosDoPainel(false);
    } catch (error) {
      console.error("Erro ao encerrar projeto:", error);
      alert("Falha ao encerrar o projeto.");
    }
  }

  async function handleDeletar(id: string) {
    if (
      !confirm("Tem certeza que deseja deletar este projeto permanentemente?")
    ) {
      return;
    }

    try {
      await ProjetoAdminService.deletarProjeto(id);
      await carregarDadosDoPainel(false);
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      alert("Falha ao remover o projeto.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const pendentes = useMemo(
    () => todos.filter((p) => p.status === "RASCUNHO"),
    [todos],
  );

  const totalPublicados = useMemo(
    () => todos.filter((p) => p.status === "PUBLICADO").length,
    [todos],
  );

  const totalEncerrados = useMemo(
    () => todos.filter((p) => p.status === "ENCERRADO").length,
    [todos],
  );

  const projetosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return todos.filter((projeto) => {
      const bateBusca =
        !termo ||
        projeto.titulo.toLowerCase().includes(termo) ||
        projeto.descricao.toLowerCase().includes(termo) ||
        (projeto.criadorNome || "").toLowerCase().includes(termo);

      const bateStatus =
        filtroStatus === "TODOS" || projeto.status === filtroStatus;

      return bateBusca && bateStatus;
    });
  }, [todos, busca, filtroStatus]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0d] text-violet-300">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm">
          Carregando painel administrativo...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15">
                <Gamepad2 className="h-6 w-6 text-violet-300" />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xl font-bold tracking-[0.25em] text-white">
                    APOIA<span className="text-violet-400">CE</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Painel admin
                  </span>
                </div>
                <p className="text-sm text-white/50">
                  Gerencie aprovações, projetos publicados e ações
                  administrativas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => carregarDadosDoPainel(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/80 transition hover:bg-white/10"
                aria-label="Atualizar painel administrativo"
                type="button"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                Atualizar
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 text-sm text-rose-300 transition hover:bg-rose-500/15"
                aria-label="Sair do painel administrativo"
                type="button"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total de projetos"
            value={todos.length}
            icon={<FolderKanban className="h-4 w-4" />}
          />
          <StatCard
            title="Pendentes"
            value={pendentes.length}
            icon={<Clock className="h-4 w-4" />}
            tone="warning"
          />
          <StatCard
            title="Publicados"
            value={totalPublicados}
            icon={<TrendingUp className="h-4 w-4" />}
            tone="success"
          />
          <StatCard
            title="Encerrados"
            value={totalEncerrados}
            icon={<Ban className="h-4 w-4" />}
          />
        </section>

        {erro && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{erro}</span>
          </div>
        )}

        <section className="mb-8 rounded-3xl border border-white/10 bg-[#141416] p-5">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-amber-300" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                Pendentes de aprovação
              </h2>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                {pendentes.length} aguardando
              </span>
            </div>
          </div>

          <div className={`space-y-4 ${scrollbarCustomClass}`}>
            {pendentes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/40">
                Nenhum projeto pendente de aprovação.
              </div>
            ) : (
              pendentes.map((projeto) => (
                <article
                  key={projeto.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:bg-white/[0.03]"
                >
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-white">
                        {projeto.titulo}
                      </h3>
                      <p className="mt-1 text-sm text-white/45">
                        por {projeto.criadorNome || "Criador não informado"}
                      </p>
                    </div>

                    <StatusPill status={projeto.status} />
                  </div>

                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/60">
                    {projeto.descricao}
                  </p>

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-white/45">
                      Meta:{" "}
                      <span className="font-semibold text-white">
                        R$ {projeto.metaValor.toLocaleString("pt-BR")}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => handleRecusar(projeto.id)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 text-sm font-medium text-rose-300 transition hover:bg-rose-500/15"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                        Recusar
                      </button>

                      <button
                        onClick={() => handleAprovar(projeto.id)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/15 px-4 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20"
                        type="button"
                      >
                        <Check className="h-4 w-4" />
                        Aprovar e publicar
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#141416] p-5">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <List className="h-4 w-4 text-white/40" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                Todos os projetos
              </h2>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por título, descrição ou criador"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-500/30 focus:bg-white/[0.07] md:w-80"
                />
              </label>

              <select
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(e.target.value as FiltroStatus)
                }
                className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-violet-500/30"
              >
                <option value="TODOS" className="bg-[#141416]">
                  Todos os status
                </option>
                <option value="RASCUNHO" className="bg-[#141416]">
                  Rascunho
                </option>
                <option value="PUBLICADO" className="bg-[#141416]">
                  Publicado
                </option>
                <option value="PAUSADO" className="bg-[#141416]">
                  Pausado
                </option>
                <option value="ENCERRADO" className="bg-[#141416]">
                  Encerrado
                </option>
              </select>
            </div>
          </div>

          <div
            className={`overflow-x-auto rounded-2xl border border-white/10 ${scrollbarCustomClass}`}
          >
            <table className="min-w-[820px] w-full text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-white/35">
                <tr>
                  <th className="px-5 py-4 text-left">Projeto</th>
                  <th className="px-5 py-4 text-left">Criador</th>
                  <th className="px-5 py-4 text-left">Meta</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {projetosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-white/40"
                    >
                      Nenhum projeto encontrado para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  projetosFiltrados.map((projeto, i) => (
                    <tr
                      key={projeto.id}
                      className={`border-t border-white/5 transition hover:bg-white/[0.025] ${
                        i % 2 !== 0 ? "bg-white/[0.015]" : ""
                      }`}
                    >
                      <td className="max-w-md px-5 py-4 align-top">
                        <p className="mb-1 font-medium text-white">
                          {projeto.titulo}
                        </p>
                        <p
                          className="line-clamp-2 text-xs leading-relaxed text-white/40"
                          title={projeto.descricao}
                        >
                          {projeto.descricao}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top text-white/60">
                        {projeto.criadorNome || "—"}
                      </td>

                      <td className="px-5 py-4 align-top text-white/60">
                        R$ {projeto.metaValor.toLocaleString("pt-BR")}
                      </td>

                      <td className="px-5 py-4 align-top">
                        <StatusPill status={projeto.status} />
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center justify-center gap-2">
                          {projeto.status === "PUBLICADO" && (
                            <button
                              onClick={() => handleEncerrar(projeto.id)}
                              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 text-orange-300 transition hover:bg-orange-500/15"
                              title="Encerrar projeto"
                              aria-label={`Encerrar projeto ${projeto.titulo}`}
                              type="button"
                            >
                              <Ban className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDeletar(projeto.id)}
                            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-rose-500/15 bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/15"
                            title="Deletar projeto permanentemente"
                            aria-label={`Deletar projeto ${projeto.titulo}`}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/5 bg-[#0b0b0d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/35 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>
            © {new Date().getFullYear()} APOIACE. Todos os direitos reservados.
          </span>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/10">
              <Gamepad2 className="h-3.5 w-3.5 text-violet-300" />
            </div>
            <span className="font-semibold tracking-[0.25em] text-white/70">
              APOIA<span className="text-violet-400">CE</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
