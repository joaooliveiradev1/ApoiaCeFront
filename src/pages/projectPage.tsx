import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/header";
import { ProjectHero } from "../components/projectHero";
import { ProjectTabs } from "../components/projectTabs";
import { Footer } from "../components/footer";
import api from "../services/api";

interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  capaUrl: string;
  categoriaNome: string;
  criadorNome: string;
  valorCaptado: number;
  metaValor: number;
  dataFim: string;
  qtdApoiadores: number;
  videoUrl: string | null;
  status: string;
}

function calcularDiasRestantes(dataFim: string): number {
  const diff = new Date(dataFim).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
  if (!id) return;

  const carregar = () => {
    setIsLoading(true);
    api.get<Projeto>(`/projetos/${id}`)
      .then((res) => setProjeto(res.data))
      .catch(() => setErro("Erro ao carregar projeto."))
      .finally(() => setIsLoading(false));
  };

  carregar();

  window.addEventListener("focus", carregar);
  return () => window.removeEventListener("focus", carregar);
}, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a]">
        <p className="text-white/50">Carregando projeto...</p>
      </div>
    );
  }

  if (erro || !projeto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a]">
        <p className="text-red-400">{erro || "Projeto não encontrado."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1a]">
      <Header />
      <main className="flex-1 pt-20">
        <ProjectHero
          id={projeto.id} 
          category={projeto.categoriaNome}
          title={projeto.titulo}
          subtitle={projeto.descricao?.slice(0, 80) + "..."}
          imageUrl={projeto.capaUrl}
          raised={Number(projeto.valorCaptado)}
          goal={Number(projeto.metaValor)}
          daysLeft={calcularDiasRestantes(projeto.dataFim)}
          supporters={projeto.qtdApoiadores}
          creatorName={projeto.criadorNome}
        />
        <ProjectTabs
          title={projeto.titulo}
          description={projeto.descricao}
        />
      </main>
      <Footer />
    </div>
  );
}