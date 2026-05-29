import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projetoService, type Projeto } from "../services/projetoService";

function calcularDiasRestantes(dataFim: string | null): number {
  if (!dataFim) return 0;
  const diff = new Date(dataFim).getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

interface ListProjectsProps {
  activeCategory: string;
  search: string;
}

export function ListProjects({ activeCategory, search }: ListProjectsProps) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setErro(null);

    const categoria = activeCategory === "Todos" ? undefined : activeCategory;

    projetoService.listar(0, 12, categoria, search || undefined)
      .then((data) => setProjetos(data.content))
      .catch(() => setErro("Erro ao carregar projetos."))
      .finally(() => setIsLoading(false));
  }, [activeCategory, search]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-catalog-bg px-4 py-16 flex items-center justify-center">
        <p className="text-muted-foreground">Carregando projetos...</p>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="min-h-screen bg-catalog-bg px-4 py-16 flex items-center justify-center">
        <p className="text-red-400">{erro}</p>
      </section>
    );
  }

  if (projetos.length === 0) {
    return (
      <section className="min-h-screen bg-catalog-bg px-4 py-16 flex items-center justify-center">
        <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-catalog-bg px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto, i) => (
            <ProjectCard
              key={projeto.id}
              id={projeto.id}
              title={projeto.titulo}
              author={projeto.criadorNome}
              category={projeto.categoriaNome}
              imageUrl={projeto.capaUrl}
              raised={projeto.valorCaptado}
              goal={projeto.metaValor}
              daysLeft={calcularDiasRestantes(projeto.dataFim)}
              supporters={projeto.qtdApoiadores}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}