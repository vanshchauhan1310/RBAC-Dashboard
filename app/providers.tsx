'use client'

import { RoleProvider } from "@/contexts/RoleContext"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RoleProvider>{children}</RoleProvider>
    </ThemeProvider>
  )
}

