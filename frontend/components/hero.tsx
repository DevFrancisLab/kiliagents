import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Building2, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Bot className="h-8 w-8 text-blue-300" />
            <span className="text-2xl font-bold">KiliAgents</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Multi-Agent Platform for <span className="text-blue-300">Smarter Communities</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Transforming Kilimani through intelligent coordination of residents, authorities, and community pillars with
            autonomous AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/dashboard">
                View Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-300 text-blue-100 hover:bg-blue-800 bg-transparent"
            >
              <Link href="/report">Report Issue</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-blue-200">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span>Smart Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Community Coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>AI Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
