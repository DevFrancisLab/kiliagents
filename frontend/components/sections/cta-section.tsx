import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Bot, Users, Zap } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">Join the Revolution</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Community?</h2>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI-driven community coordination. Join KiliAgents today and be part of the smart
            city revolution that's reshaping how communities work together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg">
            <Link href="/dashboard">
              Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-300 text-white hover:bg-blue-800/50 bg-transparent backdrop-blur-sm"
          >
            <Link href="/report">
              <Play className="mr-2 h-5 w-5" />
              Report an Issue
            </Link>
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="font-semibold mb-2">Community Driven</h3>
            <p className="text-blue-200 text-sm">
              Built by the community, for the community. Every voice matters in shaping our shared future.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-300" />
            </div>
            <h3 className="font-semibold mb-2">Instant Response</h3>
            <p className="text-blue-200 text-sm">
              AI agents work 24/7 to ensure rapid response times and efficient problem resolution.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-purple-300" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-blue-200 text-sm">
              Advanced artificial intelligence ensures smart decision-making and predictive community management.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-200 text-sm">
            Trusted by community leaders • Powered by cutting-edge AI • Built for the future
          </p>
        </div>
      </div>
    </section>
  )
}
