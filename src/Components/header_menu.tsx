import Logo from '../assets/ApoiaCe.svg'

export function HeaderPreMenu() {
  return (
    <header className="w-full h-[68px] bg-[#1F1D2B] flex items-center justify-between px-12">
      <img 
        src={Logo} 
        alt="ApoiaCe Logo"
        className="h-4 w-auto"
      />

      <nav className="flex items-center gap-40 text-xs uppercase tracking-widest text-white/60">
        <a href="#" className="hover:text-[#8759E2] transition-colors underline underline-offset-2">Home</a>
        <a href="#" className="hover:text-[#8759E2] transition-colors underline underline-offset-2">Projetos</a>
        <a href="#" className="hover:text-[#8759E2] transition-colors underline underline-offset-2">Criar-Projeto</a>
      </nav>

      <div className="flex items-center gap-3">
        <button className="h-8 px-4 rounded-md border border-white/30 text-xs uppercase tracking-widest text-white hover:text-[#8759E2] transition-colors cursor-pointer">
          Registrar
        </button>
        <button className="h-8 px-4 rounded-md border border-white/30 text-xs uppercase tracking-widest text-white hover:text-[#8759E2] transition-colors cursor-pointer">
          Login
        </button>
      </div>
    </header>
  )
}