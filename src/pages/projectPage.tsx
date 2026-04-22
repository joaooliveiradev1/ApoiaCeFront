import { Header } from "../components/header";
import { ProjectHero } from "../components/projectHero";
import { ProjectTabs } from "../components/projectTabs";
import { Footer } from "../components/footer";

export function ProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1a]">
      <Header />

      <main className="flex-1 pt-20">
        <ProjectHero />
        <ProjectTabs />
      </main>

      <Footer />
    </div>
  );
}