import { HeaderPreMenu } from '../Components/header_menu'
import { Footer } from '../Components/footer'
import { InfoBox } from '../Components/infoBox'
import { ProjectsPreMenu } from '../Components/projects_menu'
import { Section } from '../Components/section'

export function PreMenu() {
  return (
    <div className="min-h-screen bg-[#1F1D2B] flex flex-col">
      <HeaderPreMenu />
      <InfoBox/>
      <div className="w-full max-w-[1200px] mx-auto">
      <ProjectsPreMenu/>
      </div>
      <Section/>
      <Footer/>
    </div>
    
  )
}
