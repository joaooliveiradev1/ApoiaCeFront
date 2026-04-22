import { ProjectCard } from "./ProjectCard";

// Dados de exemplo
const mockProjects = [
  {
    id: "1",
    title: "Aventuras no Mundo dos Pixels",
    author: "João Silva",
    category: "Games",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    raised: 15000,
    goal: 25000,
    daysLeft: 12,
    supporters: 230,
  },
  {
    id: "2",
    title: "Dragões & Masmorras: O Livro",
    author: "Maria Costa",
    category: "RPG",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop",
    raised: 42000,
    goal: 50000,
    daysLeft: 5,
    supporters: 890,
  },
  {
    id: "3",
    title: "HQ: Heróis do Amanhã",
    author: "Pedro Souza",
    category: "Quadrinhos",
    imageUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=300&fit=crop",
    raised: 8000,
    goal: 20000,
    daysLeft: 30,
    supporters: 120,
  },
  {
    id: "4",
    title: "App Geek Manager",
    author: "Ana Lima",
    category: "Tecnologia",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    raised: 60000,
    goal: 60000,
    daysLeft: 0,
    supporters: 1500,
  },
  {
    id: "5",
    title: "Trilha Sonora Épica Vol. 2",
    author: "Lucas Mendes",
    category: "Música",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    raised: 3200,
    goal: 10000,
    daysLeft: 22,
    supporters: 75,
  },
  {
    id: "6",
    title: "Conquest: O Boardgame",
    author: "Fernanda Rocha",
    category: "Boardgames",
    imageUrl:
      "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=400&h=300&fit=crop",
    raised: 28000,
    goal: 35000,
    daysLeft: 8,
    supporters: 410,
  },
];

export function ListProjects() {
  return (
    <section className="min-h-screen bg-catalog-bg px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}