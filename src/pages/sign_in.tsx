import { Header } from '../Components/header_register'
import { SignInCard } from '../Components/SignInCard'
import { Footer } from '../Components/footer'

export function SignIn() {
  return (
    <div className="min-h-screen bg-[#1F1D2B] flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4">
        <SignInCard />
      </div>
      <Footer/>
    </div>
  )
}
