import { useState } from "react";

interface ProjectTabsProps {
  title?: string;
  description?: string;
}

export function ProjectTabs({
  title = "",
  description = "",
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
          {title && (
            <h2 className="text-lg font-black text-white mb-3">{title}</h2>
          )}
          <p>{description}</p>
        </div>

      </div>
    </div>
  );
}