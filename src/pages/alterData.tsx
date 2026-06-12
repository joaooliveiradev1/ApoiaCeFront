import { useAuth } from "@/hooks/useAuth";
import { FooterSimple } from "@/Components/footerSimple";
import { Header } from "@/Components/header";
import { ProfileFormCriador } from "@/Components/Profileformcriador";
import { ProfileForm } from "@/Components/alterPerfilBox";

export function AlterData() {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        {usuario?.role === "CRIADOR" ? <ProfileFormCriador /> : <ProfileForm />}
      </main>
      <FooterSimple />
    </div>
  );
}
