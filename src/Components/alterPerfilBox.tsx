import { useState, useRef, useEffect } from "react";
import { User, Mail, FileText, Landmark, KeyRound } from "lucide-react";
import { usePerfil } from "@/hooks/usePerfil";

const inputClass =
  "w-full rounded-xl bg-[#141422] border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-300 mb-2";

export function ProfileForm() {
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
    } catch (error) {
      console.error("Erro ao salvar:", error);
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(122,47,255,0.18),rgba(255,0,153,0.10))] p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300 font-bold">
            Área do perfil
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black italic tracking-tight text-white">
            MINHAS INFORMAÇÕES
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/55">
            Gerencie seus dados pessoais e mantenha seu perfil atualizado dentro
            da plataforma.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-[#12121d] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300 font-bold">
              Informações do perfil
            </p>
            <h2 className="mt-2 text-xl font-bold text-white">
              Dados pessoais e complementares
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
                placeholder="Conte um pouco sobre você..."
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
                placeholder="CPF, e-mail, telefone ou chave aleatória"
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
              className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
