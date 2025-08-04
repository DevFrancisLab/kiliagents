import { Card, CardContent } from "@/components/ui/card"
import { Bot, Network, Zap, Users, Shield, Leaf } from "lucide-react"

const agents = [
  {
    icon: Bot,
    name: "Development Agent",
    description: "Monitors construction permits, zoning compliance, and sustainable development practices.",
    color: "blue",
  },
  {
    icon: Leaf,
    name: "Environment Agent",
    description: "Tracks air quality, green space preservation, and environmental impact assessments.",
    color: "green",
  },
  {
    icon: Users,
    name: "Social Cohesion Agent",
    description: "Facilitates community engagement, conflict resolution, and inclusive participation.",
    color: "purple",
  },
  {
    icon: Zap,
    name: "SME Support Agent",
    description: "Identifies business opportunities, provides market insights, and supports local enterprises.",
    color: "orange",
  },
  {
    icon: Shield,
    name: "Safety Agent",
    description: "Coordinates emergency response, monitors security incidents, and ensures public safety.",
    color: "red",
  },
]

export function SolutionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Multi-Agent AI Solution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Autonomous AI agents working in coordination to address community challenges through real-time monitoring,
            analysis, and intelligent response systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${agent.color}-100`}>
                    <agent.icon className={`h-6 w-6 text-${agent.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{agent.name}</h3>
                    <p className="text-gray-600 text-sm">{agent.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <Network className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coordinated Intelligence</h3>
              <p className="text-gray-600">
                All agents communicate through a central coordination system, sharing insights and collaborating to
                provide holistic solutions for community challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
