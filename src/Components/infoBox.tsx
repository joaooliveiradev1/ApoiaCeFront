import ImgProjeto from '../assets/projeto_apoia_ce.png'

export function InfoBox() {
  return (
<section className="w-full rounded-lg bg-none px-24 py-20 flex items-center justify-between gap-8">
  <div className="max-w-md flex flex-col gap-6 ml-8">
    <h1 className="text-white text-[34px] font-['Poppins'] font-semibold leading-tight">
      Procurando ajuda financeira para o seu projeto ?
    </h1>
    <p className="text-[#6B6880] text-sm leading-relaxed">
      Conecte-se com pessoas e projetos incríveis. Apoie causas, colabore com ideias e faça parte de uma comunidade que acredita no poder coletivo.
    </p>
    <div className="flex gap-4">
      <button className="rounded-md px-5 py-2 text-[16px] font-['Poppins'] font-semibold text-white transition-colors cursor-pointer" style={{ background: 'linear-gradient(135deg, #6C3FC5, #3081ED)' }}>
        Apoiar projeto
      </button>
      <button className="rounded-md border border-white px-5 py-2 text-[16px] font-['Poppins'] font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer">
        Publicar projeto
      </button>
    </div>
  </div>
<div className="hidden md:block mr-8">
  <div className="p-[2px] rounded-xl" style={{ background: 'linear-gradient(135deg, #6C3FC5, #FF6AF2, #3081ED)' }}>
    <div className="p-2 rounded-xl bg-[#1F1D2B]">
      <img
        src={ImgProjeto}
        alt="Pessoas colaborando em projetos"
        className="w-[320px] h-[240px] rounded-lg object-cover"
      />
    </div>
  </div>
</div>
</section>
  )
}
