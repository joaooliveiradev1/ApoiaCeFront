import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Gamepad2, Mail, Lock, ArrowLeft, Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService"; // 🛠️ Importando seu Service integrado

type EtapaForm = "SOLICITAR" | "REDEFINIR" | "SUCESSO";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState<EtapaForm>("SOLICITAR");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    email: "",
    token: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  // 1ª ETAPA: Solicitação do token à API
  const handleSolicitarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return setError("Por favor, preencha seu e-mail.");

    setIsLoading(true);
    setError(null);

    try {
      // Chamada real para o Spring Boot
      await authService.solicitarTokenSenha(form.email);
      setEtapa("REDEFINIR");
    } catch (err: any) {
      // Captura o erro 404 (E-mail não cadastrado) ou qualquer outro enviado pelo backend
      const msgErro = err?.response?.data?.message || "Ocorreu um erro ao processar sua solicitação.";
      setError(msgErro);
    } finally {
      setIsLoading(false);
    }
  };

  // 2ª ETAPA: Confirmação do Token + Nova Senha
  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.token || !form.novaSenha || !form.confirmarSenha) {
      return setError("Preencha todos os campos obrigatórios.");
    }
    if (form.novaSenha !== form.confirmarSenha) {
      return setError("As senhas não coincidem.");
    }
    if (form.novaSenha.length < 6) {
      return setError("A nova senha deve ter no mínimo 6 caracteres.");
    }

    setIsLoading(true);
    setError(null);

    try {
      // Chamada real passando email, token e a nova senha
      await authService.redefinirSenha({
        email: form.email,
        token: form.token,
        novaSenha: form.novaSenha
      });
      setEtapa("SUCESSO");
    } catch (err: any) {
      const msgErro = err?.response?.data?.message || "Código inválido ou expirado.";
      setError(msgErro);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden p-4">
      {/* Gradients de fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

      {etapa !== "SUCESSO" && (
        <button
          onClick={() => (etapa === "REDEFINIR" ? setEtapa("SOLICITAR") : navigate("/login"))}
          className="absolute top-8 left-8 text-muted-foreground hover:text-white transition-colors flex items-center gap-2 font-medium z-20 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 rounded-xl bg-primary/20 items-center justify-center border border-primary/50 mb-4">
              <Gamepad2 className="w-7 h-7 text-primary" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {etapa === "SOLICITAR" && (
              <motion.div
                key="solicitar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-display font-bold text-white mb-2">Recuperar Senha</h1>
                  <p className="text-sm text-muted-foreground">
                    Insira seu e-mail cadastrado. Validaremos se ele existe e enviaremos um token de acesso rápido.
                  </p>
                </div>

                <form onSubmit={handleSolicitarCodigo} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">E-mail corporativo ou pessoal</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        disabled={isLoading}
                        className="pl-10 bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-2 glow-primary text-sm tracking-widest"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "GERAR CÓDIGO DE ACESSO"}
                  </Button>
                </form>
              </motion.div>
            )}

            {etapa === "REDEFINIR" && (
              <motion.div
                key="redefinir"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-display font-bold text-white mb-2">Criar Nova Senha</h1>
                  <p className="text-xs text-muted-foreground">
                    Código enviado para <strong className="text-white font-medium">{form.email}</strong>
                  </p>
                </div>

                <form onSubmit={handleRedefinirSenha} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="token" className="text-white/80">Código de Verificação (6 dígitos)</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="token"
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        value={form.token}
                        onChange={handleChange("token")}
                        disabled={isLoading}
                        className="pl-10 tracking-[0.5em] font-mono text-center text-lg bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:tracking-normal placeholder:font-sans placeholder:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="novaSenha" className="text-white/80">Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="novaSenha"
                        type="password"
                        placeholder="••••••••"
                        value={form.novaSenha}
                        onChange={handleChange("novaSenha")}
                        disabled={isLoading}
                        className="pl-10 bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirmarSenha" className="text-white/80">Confirmar Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmarSenha"
                        type="password"
                        placeholder="••••••••"
                        value={form.confirmarSenha}
                        onChange={handleChange("confirmarSenha")}
                        disabled={isLoading}
                        className="pl-10 bg-background/50 border-white/10 focus-visible:border-primary/50 focus-visible:ring-primary/20 text-white h-12 rounded-xl placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl mt-4 glow-primary text-sm tracking-widest"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ALTERAR CREDENCIAIS"}
                  </Button>
                </form>
              </motion.div>
            )}

            {etapa === "SUCESSO" && (
              <motion.div
                key="sucesso"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
                </div>
                <h1 className="text-2xl font-display font-bold text-white mb-2">Tudo pronto!</h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Sua senha foi redefinida com sucesso. Agora você pode acessar sua conta normalmente.
                </p>

                <Button
                  onClick={() => navigate("/login")}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl glow-primary text-sm tracking-widest"
                >
                  IR PARA O LOGIN
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}