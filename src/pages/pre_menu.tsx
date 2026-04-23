import { Header } from "../Components/header";
import { Footer } from "../Components/footer";
import { PreHome } from "@/Components/preHome";

export function PreMenu() {
  return (
    <div className="w-full">
      <Header />
      <PreHome />
      <Footer />
    </div>
  );
}
