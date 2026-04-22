import { Link, useLocation } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { Search, Menu, User, Gamepad2, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projetos", path: "/explore" },
    { name: "Perfil", path: "#" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:glow-primary transition-all duration-300">
            <Gamepad2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-display font-bold text-2xl tracking-wider text-white">
            APOIA<span className="text-primary">CE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white rounded-full"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Só mostra "Entrar" se NÃO estiver logado */}
            {!usuario && (
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="hidden lg:flex text-muted-foreground hover:text-white font-medium"
                >
                  Entrar
                </Button>
              </Link>
            )}

            {/* Se estiver logado, mostra saudação + botão logout */}
            {usuario && (
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-muted-foreground hover:text-red-400 rounded-full"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            )}

            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6 glow-primary">
                Criar Projeto
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="w-5 h-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background border-l-white/10"
            >
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px w-full bg-white/10 my-4" />

                {!usuario ? (
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/10"
                    >
                      <User className="w-4 h-4 mr-2" /> Entrar
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full justify-start border-white/10 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sair
                  </Button>
                )}

                <Link to="/register">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary">
                    Criar Projeto
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
