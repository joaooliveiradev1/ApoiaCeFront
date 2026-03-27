import { Header } from "../Components/header";
import { Footer } from "../Components/footer";
import { SearchHome } from "../Components/searchHome";
import { ListProjects } from "../Components/listProjects"

export function MainPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />

      <main className="pt-24 space-y-10">
        <SearchHome />
        <ListProjects />
      </main>

      <Footer />
    </div>
  );
}
