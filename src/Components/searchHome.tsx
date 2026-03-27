import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = [
  "Todos",
  "Games",
  "RPG",
  "Quadrinhos",
  "Tecnologia",
  "Música",
  "Boardgames",
];

export function SearchHome() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <section className="bg-catalog-bg px-4 py-6">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold md:text-5xl">
                <span className="text-catalog-text">Catálogo de </span>
                <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Projetos
                </span>
        </h1>

          <p className="mt-4 text-catalog-muted max-w-2xl mx-auto">
            Explore as melhores iniciativas geek e gamer financiadas pela
            comunidade.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center"
        >
          {/* Input */}
          <div className="flex w-full items-center gap-3 rounded-xl bg-catalog-card px-4 py-3 ring-1 ring-catalog-border">
            <Search className="h-5 w-5 text-catalog-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-catalog-text placeholder:text-catalog-muted outline-none"
            />
          </div>

          {/* Button */}
          <button className="flex items-center justify-center gap-2 rounded-xl bg-catalog-card px-5 py-3 text-sm font-medium text-catalog-text ring-1 ring-catalog-border transition-colors hover:bg-catalog-border md:w-auto w-full">
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </button>
        </motion.div>

        {/* Category Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-105"
                  : "bg-catalog-card text-catalog-muted ring-1 ring-catalog-border hover:text-catalog-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}