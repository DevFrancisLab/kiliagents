import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 animate-pulse" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative container mx-auto px-4 text-center text-white">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Smart Communities
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto">
            AI-powered coordination that brings your community together. Report issues, track progress, and build a
            better neighborhood.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl text-lg px-8 py-4">
              <Link href="/auth/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 bg-transparent"
            >
              <Link href="#demo">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <div className="text-blue-200 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-200 text-sm">Issues Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200 text-sm">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
