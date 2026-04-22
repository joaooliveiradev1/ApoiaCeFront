import { useState, useRef } from "react";
import { Pencil } from "lucide-react";

interface ProfileData {
  displayName: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

const MAX_BIO_LENGTH = 180;

export function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>({
    displayName: "Arthur",
    username: "arthur_dev",
    email: "arthur.vfx@apoiace.com",
    bio: "Criador de conteúdo focado em VFX e Motion Design para a comunidade gamer. Buscando transformar pixels em experiências épicas.",
    avatarUrl: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (field === "bio" && value.length > MAX_BIO_LENGTH) return;
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleDiscard = () => {
    setProfile({
      displayName: "Arthur",
      username: "arthur_dev",
      email: "arthur.vfx@apoiace.com",
      bio: "Criador de conteúdo focado em VFX e Motion Design para a comunidade gamer. Buscando transformar pixels em experiências épicas.",
      avatarUrl: null,
    });
  };

  const inputClass =
    "w-full rounded-md bg-[#1a1a2e] border border-white/10 text-white text-sm px-3 py-2.5 outline-none focus:border-purple-500 transition-colors placeholder:text-white/30";

  const labelClass =
    "block text-xs font-bold uppercase tracking-widest text-purple-400 mb-1.5";

  return (
    <div className="min-h-screen bg-[#0f0f1a] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="font-black text-3xl italic tracking-tight text-white md:text-4xl">
          MEU PERFIL
        </h1>
        <p className="mt-1 text-sm text-white/40">
          Gerencie suas informações públicas e configurações de conta.
        </p>

        {/* Content */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row">
          {/* Avatar section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 bg-[#1a1a2e]">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/30 text-3xl">
                    ?
                  </div>
                )}
              </div>
              <button
                onClick={handleAvatarClick}
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
              <p className="text-sm font-semibold text-white">Avatar do Criador</p>
              <p className="text-xs text-white/40">
                JPG, PNG ou GIF. Máximo de 5MB.
              </p>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Nome de exibição</label>
                <input
                  value={profile.displayName}
                  onChange={(e) => handleChange("displayName", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Nome de usuário</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                    @
                  </span>
                  <input
                    value={profile.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className={`${inputClass} pl-7`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Endereço de e-mail</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Bio / Descrição curta</label>
              <textarea
                value={profile.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <p className="text-right text-xs text-white/30 mt-1">
                Máximo {MAX_BIO_LENGTH} caracteres
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                onClick={handleDiscard}
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                Descartar
              </button>
              <button className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 bg-gradient-to-r from-purple-600 to-pink-500">
                SALVAR ALTERAÇÕES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}