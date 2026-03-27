import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link } from "wouter";
import { Gamepad2, Mail, Lock, ArrowLeft } from "lucide-react";

export function SignInCard() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de login aqui
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

      <Link
        href="/"
        className="absolute top-8 left-8 text-muted-foreground hover:text-white transition-colors flex items-center gap-2 font-medium z-20"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:glow-primary transition-all duration-300">
                <Gamepad2 className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Acesse sua conta para continuar apoiando projetos incríveis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="pl-10 bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="senha" className="text-white/80">
                  Senha
                </Label>
                <a
                  href="#"
                  className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={handleChange("senha")}
                  className="pl-10 bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4 glow-primary text-lg tracking-widest"
            >
              ENTRAR
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-white font-medium hover:text-primary transition-colors"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
