import type React from "react"
import { Bot, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">KiliAgents</span>
          </Link>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-blue-200 text-sm">
        <p>&copy; 2024 KiliAgents. Building smarter communities together.</p>
      </footer>
    </div>
  )
}
