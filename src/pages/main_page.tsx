import { useState } from "react";
import { Header } from "../Components/header";
import { Footer } from "../Components/footer";
import { SearchHome } from "../Components/searchHome";
import { ListProjects } from "../Components/listProjects";

export function MainPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 space-y-10">
        <SearchHome
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
        />
        <ListProjects activeCategory={activeCategory} search={search} />
      </main>
      <Footer />
    </div>
  );
}