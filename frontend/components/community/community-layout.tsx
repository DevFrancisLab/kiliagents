import type React from "react"
import { Navigation } from "@/components/layout/navigation"

interface CommunityLayoutProps {
  children: React.ReactNode
}

export function CommunityLayout({ children }: CommunityLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
          <p className="text-gray-600">Connect, collaborate, and build a better neighborhood together</p>
        </div>
        {children}
      </main>
    </div>
  )
}
