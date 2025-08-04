import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Community?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join the future of smart community management with KiliAgents. Experience the power of AI-driven coordination
          and real-time insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/dashboard">
              Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-300 text-white hover:bg-blue-800 bg-transparent"
          >
            <Link href="/demo">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
