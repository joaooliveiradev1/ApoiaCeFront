import { Header } from "@/components/header";
import { ProfileForm } from "@/components/alterPerfilBox";
import { Footer } from "@/components/footer";

export function AlterData() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20">
        <ProfileForm />
      </main>
      <Footer />
    </div>
  );
}