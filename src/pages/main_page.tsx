import { useState, useEffect } from "react";
import { Header } from "../Components/header";
import { Footer } from "../Components/footer";
import { SearchHome } from "../Components/searchHome";
import { ListProjects } from "../Components/listProjects";
import { categoriaService, type Categoria } from "../services/categoriaService";

export function MainPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState(""); // "" significa "Todos"
  const [search, setSearch] = useState("");

  useEffect(() => {
    categoriaService.listar().then(setCategorias);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 space-y-10">
        <SearchHome
          categorias={categorias}
          activeCategoryId={activeCategoryId}
          setActiveCategoryId={setActiveCategoryId}
          search={search}
          setSearch={setSearch}
        />
        <ListProjects activeCategory={activeCategoryId} search={search} />
      </main>
      <Footer />
    </div>
  );
}