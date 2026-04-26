import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Page = "home" | "about" | "works" | "careers" | "contact"

interface NavContextType {
  currentPage: Page
  navigate: (page: Page) => void
}

const NavContext = createContext<NavContextType>({
  currentPage: "home",
  navigate: () => {},
})

function getPageFromHash(): Page {
  const hash = window.location.hash.replace("#", "") as Page
  const valid: Page[] = ["home", "about", "works", "careers", "contact"]
  return valid.includes(hash) ? hash : "home"
}

export function NavProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash)

  useEffect(() => {
    const handler = () => setCurrentPage(getPageFromHash())
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  const navigate = (page: Page) => {
    window.location.hash = page
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return <NavContext.Provider value={{ currentPage, navigate }}>{children}</NavContext.Provider>
}

export function useNav() {
  return useContext(NavContext)
}
