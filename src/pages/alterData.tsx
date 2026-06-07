import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProfileForm } from "@/components/alterPerfilBox";
import { ProfileFormCriador } from "@/components/ProfileFormCriador";
import { useAuth } from "@/hooks/useAuth";

export function AlterData() {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        {usuario?.role === "CRIADOR" ? <ProfileFormCriador /> : <ProfileForm />}
      </main>
      <Footer />
    </div>
  );
}