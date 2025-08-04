import type React from "react"
import { Navigation } from "@/components/layout/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
