import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone } from "lucide-react"
import Link from "next/link"

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join thousands of community members who are already building smarter, more connected neighborhoods with
            KiliAgents.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl text-lg px-8 py-4">
              <Link href="/dashboard">
                Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 bg-transparent"
            >
              <Link href="/report">
                <Smartphone className="mr-2 h-5 w-5" />
                Report Your First Issue
              </Link>
            </Button>
          </div>

          <div className="text-blue-200 text-sm">No credit card required • Free forever • Setup in 2 minutes</div>
        </div>
      </div>
    </section>
  )
}
