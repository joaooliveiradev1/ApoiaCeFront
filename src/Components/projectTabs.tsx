import { useState } from "react";

const projectDescription = `A cada mês, a Revista Tormenta20 traz uma aventura inédita e completa, com fichas, mapas de batalha e tesouros. As aventuras são sequenciais e formam uma campanha épica, com grandes repercussões na história de Arton! Cada aventura é dividida em quatro partes, e cada parte dura uma sessão de jogo. Assim, cada aventura é suficiente para quatro sessões — ou um mês de jogo, se você jogar uma vez por semana.`;

interface ProjectTabsProps {
  title?: string;
  description?: string;
  sections?: { heading: string; content: string }[];
}

export function ProjectTabs({
  title = "O que é a Revista Tormenta20?",
  description = projectDescription,
  sections = [
    {
      heading: "O que é a Revista Tormenta20?",
      content:
        "Criada por Thiago Rosa, Glauco Lessa, J.M. Trevisan, Karen Soarele e Guilherme Dei Svaldi, a Revista Tormenta20 é a porta de entrada ideal para iniciantes, mas também traz desafios e novidades à altura dos fãs mais veteranos! A campanha é excelente para iniciantes, trazendo dicas de alguns dos mestres mais experientes do RPG nacional. Mas, se você já é experiente, Duelo de Dragões é repleta de desafios e mistérios, além de envolver figuras lendárias de Arton!",
    },
  ],
}: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState("sobre");

  const tabs = [{ id: "sobre", label: "Sobre o Projeto" }];

  return (
    <div className="bg-[#0f0f1a] text-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 mr-8 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-white/70 leading-relaxed">
          <p>{description}</p>

          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-black text-white mb-3">
                {section.heading}
              </h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}