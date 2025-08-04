import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { KeyFeatures } from "@/components/sections/key-features"
import { SocialProof } from "@/components/sections/social-proof"
import { CallToAction } from "@/components/sections/call-to-action"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ValueProposition />
      <KeyFeatures />
      <SocialProof />
      <CallToAction />
      <Footer />
    </div>
  )
}
