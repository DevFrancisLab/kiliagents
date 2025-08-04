import { Card, CardContent } from "@/components/ui/card"
import { GradientCard } from "@/components/ui/gradient-card"
import { AlertTriangle, Building, TreePine, Users, Shield, Droplets } from "lucide-react"

const problems = [
  {
    icon: Building,
    title: "Uncontrolled High-Rise Growth",
    description: "Rapid development without proper planning leading to overcrowding and infrastructure strain.",
    color: "red" as const,
  },
  {
    icon: Droplets,
    title: "Failing Infrastructure",
    description: "Water and sanitation systems unable to cope with increased population density.",
    color: "red" as const,
  },
  {
    icon: TreePine,
    title: "Loss of Green Space",
    description: "Environmental degradation with significant reduction in tree cover and open spaces.",
    color: "red" as const,
  },
  {
    icon: Users,
    title: "SME Displacement",
    description: "Small and medium enterprises being pushed out by rising costs and development pressure.",
    color: "red" as const,
  },
  {
    icon: Shield,
    title: "Safety Issues",
    description: "Increased security concerns and emergency response challenges in dense urban areas.",
    color: "red" as const,
  },
]

export function ProblemSection() {
  return (
    <section id="problems" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 rounded-full px-4 py-2 mb-4">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Urban Challenges</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Challenge in Kilimani</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rapid urbanization has created complex challenges that require intelligent, coordinated solutions for
            sustainable community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg flex-shrink-0">
                    <problem.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <GradientCard gradient="neutral" className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Coordinated Action Required</h3>
            <p className="text-gray-600">
              These interconnected challenges require a unified approach that brings together residents, authorities,
              and stakeholders through intelligent coordination systems.
            </p>
          </GradientCard>
        </div>
      </div>
    </section>
  )
}
