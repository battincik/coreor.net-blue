import type { Metadata } from "next"
import "@/index.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Coreor.net",
  description: "Coreor software services website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
