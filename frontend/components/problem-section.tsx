import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Building, TreePine, Users, Shield } from "lucide-react"

const problems = [
  {
    icon: Building,
    title: "Uncontrolled High-Rise Growth",
    description: "Rapid development without proper planning leading to overcrowding and infrastructure strain.",
  },
  {
    icon: AlertTriangle,
    title: "Failing Infrastructure",
    description: "Water and sanitation systems unable to cope with increased population density.",
  },
  {
    icon: TreePine,
    title: "Loss of Green Space",
    description: "Environmental degradation with significant reduction in tree cover and open spaces.",
  },
  {
    icon: Users,
    title: "SME Displacement",
    description: "Small and medium enterprises being pushed out by rising costs and development pressure.",
  },
  {
    icon: Shield,
    title: "Safety Issues",
    description: "Increased security concerns and emergency response challenges in dense urban areas.",
  },
]

export function ProblemSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Challenge in Kilimani</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rapid urbanization has created complex challenges that require intelligent, coordinated solutions for
            sustainable community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <problem.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{problem.title}</h3>
                    <p className="text-gray-600 text-sm">{problem.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
