import { Gamepad2, Twitter, Instagram, Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[200px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                APOIA<span className="text-primary">CE</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              O ApoiaCe nasceu em 2025 com o propósito de impulsionar projetos
              criativos no universo geek e gamer por meio de financiamento
              coletivo. Apoiamos ideias que merecem sair do papel.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">
              Explorar
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Quadrinhos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tecnologia
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Boardgames
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="text-muted-foreground">suporte@apoiace.com.br</li>
              <li className="text-muted-foreground">+55 11 99999-9999</li>
              <li className="pt-4">
                <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                  Central de Ajuda <Heart className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Projeto Apoia-CE. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
