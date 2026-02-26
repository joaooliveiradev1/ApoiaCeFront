import Logo from '../assets/ApoiaCe.svg'

export function Header() {
  return (
    <header className="w-full bg-[#0A0A12] h-[68px] flex items-center px-8">
      <span className="text-purple-400 font-bold text-xl tracking-widest">
        <img src={Logo}/>
      </span>
    </header>
  )
}