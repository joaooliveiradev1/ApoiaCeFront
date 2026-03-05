import { useState } from "react"

export function SignupCard() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="w-full max-w-[550px] rounded-3xl border-1 border-[#6C3FC5] bg-[#212131] p-10">
      <h2 className="mb-8 text-center text-[30px] font-semibold text-[#FFFFFF] font-['Poppins']">
  Crie sua conta
</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
<div className="flex flex-col gap-5 bg-[#212131]">
  <input
    placeholder="Nome"
    value={form.nome}
    onChange={handleChange("nome")}
    className="h-10 w-[80%] mx-auto rounded-md border border-white/60 bg-[#1F1D2B] px-4 text-sm text-white placeholder:text-[#A0A0A0] outline-none focus:border-[#6C3FC5]"
  /> 
  <input
    type="email"
    placeholder="E-mail"
    value={form.email}
    onChange={handleChange("email")}
    className="h-10 w-[80%] mx-auto rounded-md border border-white/60 bg-[#1F1D2B] px-4 text-sm text-white placeholder:text-[#A0A0A0] outline-none focus:border-[#6C3FC5]"
  />
  <input
    type="password"
    placeholder="Senha"
    value={form.senha}
    onChange={handleChange("senha")}
    className="h-10 w-[80%] mx-auto rounded-md border border-white/60 bg-[#1F1D2B] px-4 text-sm text-white placeholder:text-[#A0A0A0] outline-none focus:border-[#6C3FC5]"
  />
  <input
    type="password"
    placeholder="Confirmar senha"
    value={form.confirmarSenha}
    onChange={handleChange("confirmarSenha")}
    className="h-10 w-[80%] mx-auto rounded-md border border-white/60 bg-[#1F1D2B] px-4 text-sm text-white placeholder:text-[#A0A0A0] outline-none focus:border-[#6C3FC5]"
  />

<div className="flex items-center justify-between text-sm text-[#FFFFFF] px-14">
  <span>Já tem uma conta?</span>
  <a href="#" className="font-semibold hover:underline">
    Faça login
  </a>
</div>
</div>

        <div className="flex justify-center">
  <button
    type="submit"
    className="mt-2 h-11 w-40 rounded-md border border-white/30 bg-[#1F1D2B] text-base font-['Poppins'] font-semibold uppercase tracking-wider text-white hover:bg-[#5A32A3] transition-colors">
  Registrar
</button>
        </div>
      </form>
    </div>
  )
}