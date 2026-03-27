import { Header } from "../Components/header";
import { Footer } from "../Components/footer";
import Home from "@/Components/preHome";

export function PreMenu() {
  return (
    <div className="w-full">
      <Header />
      <Home></Home>
      <Footer />
    </div>
  );
}
