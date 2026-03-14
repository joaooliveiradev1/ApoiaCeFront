import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Rocket, Users2 } from "lucide-react";
import { ProjectCard } from "@/Components/projectCard";

// Mock Data using generated images
import heroImg from "../assets/projeto_apoia_ce.png";
import projeto1 from "../assets/projeto1.png";
import projeto2 from "../assets/projeto2.png";
import projeto3 from "../assets/projeto3.png";
import projeto4 from "../assets/projeto4.png";

const featuredProjects = [
  {
    id: "1",
    title: "Duelo de Dragões: RPG de Mesa",
    author: "Estúdio Tormenta",
    category: "RPG",
    imageUrl: projeto1,
    raised: 45000,
    goal: 30000,
    daysLeft: 12,
    supporters: 342,
  },
  {
    id: "2",
    title: "CyberCity 2077 - Jogo Indie",
    author: "Pixel Arts",
    category: "Games",
    imageUrl: projeto2,
    raised: 12500,
    goal: 50000,
    daysLeft: 28,
    supporters: 105,
  },
  {
    id: "3",
    title: "Crônicas do Cósmico Vol. 1",
    author: "HQ Labs",
    category: "Quadrinhos",
    imageUrl: projeto3,
    raised: 8900,
    goal: 10000,
    daysLeft: 5,
    supporters: 210,
  },
  {
    id: "4",
    title: "Expedição Estelar Boardgame",
    author: "Galactic Games",
    category: "Boardgames",
    imageUrl: projeto4,
    raised: 85000,
    goal: 80000,
    daysLeft: 3,
    supporters: 890,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/30">
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

            {/* Cyberpunk glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen" />
          </div>

          <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-primary/30 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  A nova era do crowdfunding geek
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-white mb-6">
                De{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-400">
                  Play
                </span>{" "}
                na sua
                <br />
                próxima grande
                <br />
                ideia.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                Conecte-se com pessoas e projetos incríveis. Apoie ideias,
                colabore com criadores e faça parte de uma comunidade apaixonada
                pelo universo nerd.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full glow-primary text-lg group"
                >
                  Explorar Projetos
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 border-white/10 hover:border-white/30 hover:bg-white/5 font-semibold rounded-full text-lg"
                  >
                    Criar meu projeto
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              {/* Decorative tech UI elements could go here, for now keeping it clean as the background image is strong */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 glass-panel p-6 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-1000 delay-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Projetos Financiados
                    </div>
                    <div className="text-2xl font-bold text-white">+2.4k</div>
                  </div>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Apoiadores Ativos
                    </div>
                    <div className="text-2xl font-bold text-white">+150k</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 bg-background relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Projetos em Destaque
                </h2>
                <p className="text-muted-foreground text-lg">
                  Descubra as ideias mais incríveis da comunidade.
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 hover:bg-transparent hidden md:flex items-center group"
              >
                Ver todos{" "}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProjects.map((project, idx) => (
                <ProjectCard key={project.id} {...project} index={idx} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Button
                variant="outline"
                className="w-full border-white/10 text-white"
              >
                Ver todos os projetos
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="glass-panel border-primary/20 rounded-3xl p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Pronto para tirar sua ideia do papel?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Junte-se a milhares de criadores que já transformaram seus
                sonhos em realidade com o apoio da comunidade ApoiaCe.
              </p>
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-white text-black hover:bg-white/90 font-bold rounded-full text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                >
                  Comece seu projeto agora
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
