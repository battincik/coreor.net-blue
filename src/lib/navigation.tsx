"use client"

import { usePathname, useRouter } from "next/navigation"

export type Page = "home" | "about" | "works" | "careers" | "contact"

const PAGE_TO_PATH: Record<Page, string> = {
  home: "/",
  about: "/about",
  works: "/works",
  careers: "/careers",
  contact: "/contact",
}

const PATH_TO_PAGE: Record<string, Page> = {
  "/": "home",
  "/about": "about",
  "/works": "works",
  "/careers": "careers",
  "/contact": "contact",
}

interface NavContextType {
  currentPage: Page
  navigate: (page: Page) => void
}

export function useNav(): NavContextType {
  const pathname = usePathname()
  const router = useRouter()

  const currentPage = PATH_TO_PAGE[pathname] ?? "home"

  const navigate = (page: Page) => {
    router.push(PAGE_TO_PATH[page])
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { currentPage, navigate }
}
