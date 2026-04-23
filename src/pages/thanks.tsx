import { Check } from "lucide-react";

type ThankYouProps = {
  projectTitle?: string;
  projectImage?: string;
  onViewOtherProjects?: () => void;
};

export function Thanks({
  projectTitle = "Revista Tormenta20",
  projectImage = "https://picsum.photos/seed/tormenta/800/500",
  onViewOtherProjects,
}: ThankYouProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-neutral-950 via-black to-neutral-950 p-4 pt-24">
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(168,85,247,0.35)] p-8 sm:p-10 mt-8">
        {/* Check icon */}
        <div className="flex justify-center -mt-16 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] ring-4 ring-neutral-900">
            <Check className="h-7 w-7 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          Obrigado!
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-center text-sm sm:text-base text-neutral-300 leading-relaxed max-w-md mx-auto">
          Seu apoio foi confirmado. Você acabou de fortalecer a comunidade e
          garantir recompensas épicas.
        </p>

        {/* Project card */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950/60">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <img
              src={projectImage}
              alt={projectTitle}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/800x500/1a1a2e/9b59b6?text=Projeto";
              }}
            />
          </div>
          <div className="px-6 py-5 text-center">
            <h2 className="text-xl font-bold text-white">{projectTitle}</h2>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onViewOtherProjects}
          className="mt-8 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-300 transition-all px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-5px_rgba(168,85,247,0.6)] hover:shadow-[0_8px_40px_-5px_rgba(168,85,247,0.8)]"
        >
          Ver outros projetos
        </button>
      </div>
    </div>
  );
}

export default Thanks;