import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gamepad2, ShieldCheck, Clock, List, Check, X, LogOut, Trash2, Ban } from "lucide-react";
import { ProjetoAdminService } from "../services/projetoAdminService";
import type { Projeto } from "../services/projetoService";
import { useAuth } from "../hooks/useAuth";


function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    RASCUNHO: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25",
    PUBLICADO: "bg-green-500/10 text-green-400 border border-green-500/25",
    PAUSADO: "bg-orange-500/10 text-orange-400 border border-orange-500/25",
    ENCERRADO: "bg-red-500/10 text-red-400 border border-red-500/25",
  };
  const label: Record<string, string> = {
    RASCUNHO: "Rascunho",
    PUBLICADO: "Publicado",
    PAUSADO: "Pausado",
    ENCERRADO: "Encerrado",
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${map[status] ?? ""}`}>
      {label[status] ?? status}
    </span>
  );
}

export function PageAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [pendentes, setPendentes] = useState<Projeto[]>([]);
  const [todos, setTodos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarDadosDoPainel = async () => {
    try {
      setLoading(true);
      const response = await ProjetoAdminService.listarProjetosAdmin();
      const listaCompleta = response.content;

      const listaPendentes = listaCompleta.filter((p) => p.status === "RASCUNHO");

      setTodos(listaCompleta);
      setPendentes(listaPendentes);
    } catch (error) {
      console.error("Erro ao carregar dados do painel:", error);
      alert("Não foi possível sincronizar os dados com o backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDadosDoPainel();
  }, []);

  async function handleAprovar(id: string) {
    try {
      await ProjetoAdminService.atualizarStatus(id, "PUBLICADO");
      await carregarDadosDoPainel();
    } catch (error) {
      console.error("Erro ao aprovar projeto:", error);
      alert("Falha ao aprovar o projeto.");
    }
  }

  async function handleRecusar(id: string) {
    try {
      await ProjetoAdminService.atualizarStatus(id, "ENCERRADO");
      await carregarDadosDoPainel();
    } catch (error) {
      console.error("Erro ao recusar projeto:", error);
      alert("Falha ao recusar o projeto.");
    }
  }

  async function handleEncerrar(id: string) {
    if (!confirm("Tem certeza que deseja ENCERRAR este projeto? Esta ação não pode ser desfeita no fluxo público.")) return;
    
    try {
      await ProjetoAdminService.atualizarStatus(id, "ENCERRADO");
      alert("Projeto encerrado com sucesso!");
      await carregarDadosDoPainel();
    } catch (error) {
      console.error("Erro ao encerrar projeto:", error);
      alert("Falha ao encerrar o projeto.");
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja deletar este projeto permanentemente?")) return;
    try {
      await ProjetoAdminService.deletarProjeto(id);
      await carregarDadosDoPainel();
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      alert("Falha ao remover o projeto.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const totalPublicados = todos.filter((p) => p.status === "PUBLICADO").length;

  const scrollbarCustomClass = "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center text-purple-400 font-medium">
        Carregando painel administrativo...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white font-sans flex flex-col justify-between">
      <div className="max-w-5xl w-full mx-auto px-6 py-10 flex-grow">

        {/* Topbar */}
        <div className="flex items-center justify-between mb-10 pb-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-2xl font-bold tracking-widest">
              APOIA<span className="text-purple-400">CE</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-purple-400 bg-purple-500/10 border border-purple-500/25 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              Painel admin
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-9 h-9 text-white/60 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-full transition-colors cursor-pointer"
              title="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-[#18181b] border border-white/5 rounded-xl p-5">
            <p className="text-xs text-white/40 mb-2">Total de projetos</p>
            <p className="text-3xl font-bold">{todos.length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/5 rounded-xl p-5">
            <p className="text-xs text-white/40 mb-2">Rascunhos (Pendentes)</p>
            <p className="text-3xl font-bold text-yellow-400">{pendentes.length}</p>
          </div>
          <div className="bg-[#18181b] border border-white/5 rounded-xl p-5">
            <p className="text-xs text-white/40 mb-2">Publicados</p>
            <p className="text-3xl font-bold text-green-400">{totalPublicados}</p>
          </div>
        </div>

        {/* Seção 1: Pendentes (Rascunhos) */}
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-medium tracking-widest text-white/30 uppercase">
            Pendentes de aprovação (Rascunhos)
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">
            {pendentes.length} aguardando
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className={`max-h-[550px] overflow-y-auto pr-2 space-y-3 mb-10 ${scrollbarCustomClass}`}>
          {pendentes.length === 0 && (
            <div className="bg-[#18181b] border border-white/5 rounded-xl p-6 text-center text-white/30 text-sm">
              Nenhum projeto pendente de aprovação.
            </div>
          )}
          {pendentes.map((projeto) => (
            <div key={projeto.id} className="bg-[#18181b] border border-white/5 rounded-xl p-5 overflow-hidden">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{projeto.titulo}</p>
                  <p className="text-sm text-white/40 mt-0.5">
                    por {projeto.criadorNome || "Criador autêntico"}
                  </p>
                </div>
                <StatusPill status={projeto.status} />
              </div>
              <p className="text-sm text-white/45 leading-relaxed mb-4 break-words">
                {projeto.descricao}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">
                  Meta: <strong className="text-white font-semibold">R$ {projeto.metaValor.toLocaleString("pt-BR")}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRecusar(projeto.id)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500/20 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Recusar
                  </button>
                  <button
                    onClick={() => handleAprovar(projeto.id)}
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/35 hover:bg-purple-500/30 transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Aprovar / Publicar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção 2: Todos os projetos */}
        <div className="flex items-center gap-3 mb-4">
          <List className="w-4 h-4 text-white/40" />
          <span className="text-xs font-medium tracking-widest text-white/30 uppercase">
            Todos os projetos
          </span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className={`bg-[#18181b] border border-white/5 rounded-xl max-h-[580px] overflow-y-auto overflow-x-auto ${scrollbarCustomClass}`}>
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead className="sticky top-0 bg-[#18181b] z-10 shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
              <tr className="text-white/30 text-xs font-medium bg-white/[0.02]">
                <th className="text-left px-5 py-3 w-1/2">Título e Descrição</th>
                <th className="text-left px-5 py-3 w-1/6">Criador</th>
                <th className="text-left px-5 py-3 w-1/6">Meta</th>
                <th className="text-left px-5 py-3 w-1/6">Status</th>
                <th className="text-center px-5 py-3 w-28">Ações</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((projeto, i) => (
                <tr
                  key={projeto.id}
                  className={`border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-colors ${
                    i % 2 === 0 ? "" : "bg-white/[0.01]"
                  }`}
                >
                  <td className="px-5 py-4 max-w-xs md:max-w-md">
                    <p className="font-medium text-white break-words">{projeto.titulo}</p>
                    <p className="text-xs text-white/35 mt-0.5 line-clamp-2 break-words" title={projeto.descricao}>
                      {projeto.descricao}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-white/55 whitespace-nowrap">{projeto.criadorNome || "—"}</td>
                  <td className="px-5 py-4 text-white/55 whitespace-nowrap">R$ {projeto.metaValor.toLocaleString("pt-BR")}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <StatusPill status={projeto.status} />
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* O botão de ENCERRAR continua visível apenas para projetos PUBLICADOS */}
                      {projeto.status === "PUBLICADO" && (
                        <button
                          onClick={() => handleEncerrar(projeto.id)}
                          className="p-2 text-white/40 hover:text-orange-400 bg-white/5 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/20 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                          title="Encerrar projeto"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}

                      {/* O botão de DELETAR agora está sempre visível */}
                      <button
                        onClick={() => handleDeletar(projeto.id)}
                        className="p-2 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center"
                        title="Deletar projeto permanentemente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#0d0d0f] py-6 mt-10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-white/40">
          <div>© {new Date().getFullYear()} APOIACE. Todos os direitos reservados.</div>
          <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <span className="font-bold tracking-widest text-white text-sm">
              APOIA<span className="text-purple-400">CE</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}