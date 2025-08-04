import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, Droplets, TreePine, Building } from "lucide-react"

const stats = [
  {
    icon: Building,
    value: "900",
    unit: "units/acre",
    label: "Density on Kindaruma Rd",
    trend: "up",
    color: "red",
  },
  {
    icon: Droplets,
    value: "60%",
    unit: "failure rate",
    label: "Water/Sanitation Systems",
    trend: "up",
    color: "red",
  },
  {
    icon: TreePine,
    value: "50%",
    unit: "reduction",
    label: "Tree Cover Loss",
    trend: "down",
    color: "red",
  },
  {
    icon: TrendingDown,
    value: "35%",
    unit: "displacement",
    label: "SME Business Closure",
    trend: "up",
    color: "red",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Critical Statistics</h2>
          <p className="text-xl text-gray-600">
            Data-driven insights revealing the urgent need for smart community solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${stat.color === "red" ? "bg-red-100" : "bg-green-100"}`}>
                    <stat.icon className={`h-8 w-8 ${stat.color === "red" ? "text-red-600" : "text-green-600"}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 mb-2">{stat.unit}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
