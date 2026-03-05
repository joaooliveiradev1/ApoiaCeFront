import projeto1 from '../assets/projeto1.png'
import projeto2 from '../assets/projeto2.png'
import projeto3 from '../assets/projeto3.png'
import projeto4 from '../assets/projeto4.png'
import projeto5 from '../assets/projeto5.png'
import projeto6 from '../assets/projeto6.png'
import projeto7 from '../assets/projeto7.png'
import projeto8 from '../assets/projeto8.png'

const projetos = [
  { id: 1, titulo: "Viagem a Belém", imagem: projeto1 },
  { id: 2, titulo: "Duelo de dragões", imagem: projeto2 },
  { id: 3, titulo: "O mundo de Yang", imagem: projeto3 },
  { id: 4, titulo: "Calendário Caramelo 2026", imagem: projeto4 },
  { id: 5, titulo: "Madrugada dos monstros", imagem: projeto5 },
  { id: 6, titulo: "Revista Tormenta20", imagem: projeto6 },
  { id: 7, titulo: "Dhaniya", imagem: projeto7} ,
  { id: 8, titulo: "Expedição Zoomundo", imagem: projeto8 },
]

export function ProjectsPreMenu() {
return (
  <section className="w-full px-12 py-10">
    <h2 className="text-center text-white text-2xl font-['Poppins'] font-semibold mb-8">
      Projetos
    </h2>
    <div className="flex flex-col gap-10">
      {Array.from({ length: Math.ceil(projetos.length / 4) }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-between">
          {projetos.slice(rowIndex * 4, rowIndex * 4 + 4).map((projeto) => (
            <div key={projeto.id} className="flex flex-col gap-2">
              <img
                src={projeto.imagem || "https://placehold.co/200x260"}
                alt={projeto.titulo}
                className="w-[200px] h-[200px] object-cover rounded-lg"
              />
              <span className="text-white text-sm font-['Poppins']">{projeto.titulo}</span>
              <button className="w-fit px-3 py-1 rounded border border-white/30 text-xs text-white/70 hover:text-[#8759E2] hover:border-[#8759E2] transition-colors cursor-pointer font-['Poppins']">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
)
}