import { useState } from "react";
import { Heart, Share2, MessageCircle, CheckCircle } from "lucide-react";

interface ProjectHeroProps {
  category?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  raised?: number;
  goal?: number;
  daysLeft?: number;
  supporters?: number;
  creatorName?: string;
  creatorAvatarUrl?: string | null;
}

export function ProjectHero({
  category = "RPG",
  title = "Revista Tormenta20",
  subtitle = "Aventure-se no maior RPG do Brasil!",
  imageUrl = "",
  raised = 45764,
  goal = 54500,
  daysLeft = 12,
  supporters = 97,
  creatorName = "Jambô Editora",
  creatorAvatarUrl = null,
}: ProjectHeroProps) {
  const [followed, setFollowed] = useState(false);
  const percent = Math.min(Math.round((raised / goal) * 100), 100);

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Tags */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/30 text-purple-400 border border-purple-500/40">
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            Projeto Verificado
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
          {title}
        </h1>
        <p className="text-white/50 text-sm mb-8">{subtitle}</p>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* Image */}
          <div className="flex-1">
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/10">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                  Imagem do projeto
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-72 flex flex-col gap-5">

            {/* Raised */}
            <div>
              <p className="text-3xl font-black text-white">
                {formatBRL(raised)}
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                levantados de {formatBRL(goal)}
              </p>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-white/50 mb-1.5">
                <span className="font-bold text-white">{percent}%</span>
                <span>{supporters} apoiadores</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="flex-1 rounded-xl bg-[#1a1a2e] border border-white/10 p-3 text-center">
                <p className="text-xl font-black text-white">{daysLeft}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
                  Dias restantes
                </p>
              </div>
              <div className="flex-1 rounded-xl bg-[#1a1a2e] border border-white/10 p-3 text-center">
                <p className="text-xl font-black text-white">{supporters}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">
                  Apoiadores
                </p>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:brightness-110 transition-all shadow-lg shadow-purple-900/40">
              APOIAR ESTE PROJETO
            </button>

            {/* Secondary actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setFollowed(!followed)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  followed
                    ? "border-purple-500 text-purple-400 bg-purple-500/10"
                    : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${followed ? "fill-purple-400" : ""}`} />
                Seguir
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white/60 hover:border-white/30 hover:text-white transition-all">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </button>
            </div>

            {/* Creator */}
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1a2e] border border-white/10 overflow-hidden flex items-center justify-center text-white/30 text-xs">
                  {creatorAvatarUrl ? (
                    <img src={creatorAvatarUrl} alt={creatorName} className="w-full h-full object-cover" />
                  ) : (
                    "?"
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{creatorName}</p>
                  <p className="text-xs text-white/40">Responsável pelo projeto</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                Falar com o criador
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}