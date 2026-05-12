import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { usePerfil } from "@/hooks/usePerfil";

const MAX_BIO_LENGTH = 180;

const inputClass =
  "w-full rounded-md bg-[#1a1a2e] border border-white/10 text-white text-sm px-3 py-2.5 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

const labelClass =
  "block text-xs font-bold uppercase tracking-widest text-purple-400 mb-1.5";

export function ProfileForm() {
  const { usuario, perfil, loading, erro, atualizarUsuario, salvarPerfil } =
    usePerfil();

  const valoresOriginais = useRef({ nome: "", bio: "" });
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usuario) {
      setDisplayName(usuario.nome);
      valoresOriginais.current.nome = usuario.nome;
    }
    if (perfil) {
      setBio(perfil.bio ?? "");
      valoresOriginais.current.bio = perfil.bio ?? "";
    }
  }, [usuario, perfil]);

  const handleDiscard = () => {
    setDisplayName(valoresOriginais.current.nome);
    setBio(valoresOriginais.current.bio);
    setAvatarUrl(null);
    setSucesso(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setSucesso(false);
    try {
      // atualiza nome no Usuario
      await atualizarUsuario({ nome: displayName });
      // atualiza bio no PerfilUsuario (cria se não existir)
      await salvarPerfil({ bio });
      setSucesso(true);
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
      <div className="mx-auto max-w-3xl">
        <h1 className="font-black text-3xl italic tracking-tight text-white md:text-4xl">
          MEU PERFIL
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Gerencie suas informações públicas e configurações de conta.
        </p>

        <div className="mt-10 flex flex-col gap-8 md:flex-row">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 bg-[#1a1a2e]">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/30 text-3xl">
                    {usuario?.nome?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-transform hover:scale-110"
                aria-label="Alterar avatar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">
                Avatar do Criador
              </p>
              <p className="text-xs text-white/40">
                JPG, PNG ou GIF. Máximo de 5MB.
              </p>
            </div>
          </div>

          {/* Campos */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Nome de exibição</label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={inputClass}
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

            <div>
              <label className={labelClass}>Bio / Descrição curta</label>
              <textarea
                value={bio}
                onChange={(e) =>
                  e.target.value.length <= MAX_BIO_LENGTH &&
                  setBio(e.target.value)
                }
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <p className="text-right text-xs text-white/30 mt-1">
                {bio.length}/{MAX_BIO_LENGTH} caracteres
              </p>
            </div>

            {/* Feedback de sucesso */}
            {sucesso && (
              <p className="text-sm text-green-400">
                Perfil atualizado com sucesso!
              </p>
            )}

            {/* Ações */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                onClick={handleDiscard}
                disabled={salvando}
                className="text-sm text-white/40 transition-colors hover:text-white disabled:opacity-30"
              >
                Descartar
              </button>
              <button
                onClick={handleSalvar}
                disabled={salvando}
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
