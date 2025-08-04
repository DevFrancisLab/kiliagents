import { Card, CardContent } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Bot, Network, Zap, Users, Shield, Leaf, Building } from "lucide-react"

const agents = [
  {
    icon: Building,
    name: "Development Agent",
    description: "Monitors construction permits, zoning compliance, and sustainable development practices.",
    color: "blue" as const,
  },
  {
    icon: Leaf,
    name: "Environment Agent",
    description: "Tracks air quality, green space preservation, and environmental impact assessments.",
    color: "green" as const,
  },
  {
    icon: Users,
    name: "Social Cohesion Agent",
    description: "Facilitates community engagement, conflict resolution, and inclusive participation.",
    color: "purple" as const,
  },
  {
    icon: Zap,
    name: "SME Support Agent",
    description: "Identifies business opportunities, provides market insights, and supports local enterprises.",
    color: "yellow" as const,
  },
  {
    icon: Shield,
    name: "Safety Agent",
    description: "Coordinates emergency response, monitors security incidents, and ensures public safety.",
    color: "red" as const,
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-4">
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Multi-Agent Coordination System</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Autonomous AI agents working in perfect coordination to address community challenges through real-time
            monitoring, intelligent analysis, and automated response systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-t-4 border-t-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <agent.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{agent.name}</h3>
                    <p className="text-gray-600">{agent.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <GradientCard gradient="primary" className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Network className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Coordinated Intelligence Network</h3>
            <p className="text-gray-600 text-lg mb-6">
              All agents communicate through a central coordination system, sharing insights and collaborating to
              provide holistic solutions for community challenges.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time Communication</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Shared Intelligence</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Coordinated Response</span>
              </div>
            </div>
          </GradientCard>
        </div>
      </div>
    </section>
  )
}
