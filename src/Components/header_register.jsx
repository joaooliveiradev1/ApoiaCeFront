import Logo from '../assets/ApoiaCe.svg'

export function Header() {
  return (
    <header className="w-full h-[68px] bg-[#1F1D2B] flex items-center px-12">
      <img 
        src={Logo} 
        alt="ApoiaCe Logo"
        className="h-6"
      />
    </header>
  )
}