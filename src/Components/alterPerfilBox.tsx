import { useState, useRef, useEffect } from "react";
import { usePerfil } from "@/hooks/usePerfil";

const inputClass =
  "w-full rounded-md bg-[#1a1a2e] border border-white/10 text-white text-sm px-3 py-2.5 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-purple-400 mb-1.5";

export function ProfileForm() {
  const { usuario, loading, erro, atualizarUsuario } = usePerfil();

  const valoresOriginais = useRef({ nome: "" });
  const [displayName, setDisplayName] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (usuario) {
      setDisplayName(usuario.nome);
      valoresOriginais.current.nome = usuario.nome;
    }
  }, [usuario]);

  const handleDiscard = () => {
    setDisplayName(valoresOriginais.current.nome);
    setSucesso(false);
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);
    try {
      // atualiza apenas o nome no Usuario
      await atualizarUsuario({ nome: displayName });
      
      // Atualiza o valor original para o novo nome salvo
      valoresOriginais.current.nome = displayName;
      setSucesso(true);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  };

  // estados de carregamento e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse">
          Carregando perfil...
        </p>
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
      <div className="mx-auto max-w-2xl">
        <h1 className="font-black text-3xl italic tracking-tight text-white md:text-4xl">
          MEU PERFIL
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Gerencie suas informações públicas e configurações de conta.
        </p>

        <div className="mt-10 bg-[#151525] p-6 rounded-xl border border-white/5">
          <div className="space-y-6">
            
            {/* Campos */}
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

            {/* Feedback de sucesso */}
            {sucesso && (
              <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                Perfil atualizado com sucesso!
              </p>
            )}

            {/* Ações */}
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
                className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {salvando ? "Salvando..." : "SALVAR ALTERAÇÕES"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}