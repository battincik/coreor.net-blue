import { NavProvider, useNav } from "@/lib/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { HomePage } from "@/pages/HomePage"
import { AboutPage } from "@/pages/AboutPage"
import { WorksPage } from "@/pages/WorksPage"
import { CareersPage } from "@/pages/CareersPage"
import { ContactPage } from "@/pages/ContactPage"

function PageRouter() {
  const { currentPage } = useNav()

  return (
    <div className="page-enter">
      {currentPage === "home" && <HomePage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "works" && <WorksPage />}
      {currentPage === "careers" && <CareersPage />}
      {currentPage === "contact" && <ContactPage />}
    </div>
  )
}

export function App() {
  return (
    <NavProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
      </div>
    </NavProvider>
  )
}

export default App
