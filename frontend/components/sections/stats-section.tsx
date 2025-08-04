import { MetricCard } from "@/components/ui/metric-card"
import { TrendingDown, Droplets, TreePine, Building, Users } from "lucide-react"

const stats = [
  {
    title: "Development Density",
    value: "900",
    unit: "units/acre",
    change: "+45%",
    trend: "up" as const,
    icon: Building,
    color: "red" as const,
    description: "Kindaruma Road density",
  },
  {
    title: "Infrastructure Failure",
    value: "60%",
    change: "+15%",
    trend: "up" as const,
    icon: Droplets,
    color: "red" as const,
    description: "Water/sanitation systems",
  },
  {
    title: "Environmental Loss",
    value: "50%",
    change: "-50%",
    trend: "down" as const,
    icon: TreePine,
    color: "red" as const,
    description: "Tree cover reduction",
  },
  {
    title: "Business Displacement",
    value: "35%",
    change: "+20%",
    trend: "up" as const,
    icon: Users,
    color: "red" as const,
    description: "SME closure rate",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 rounded-full px-4 py-2 mb-4">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm font-medium">Critical Statistics</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Urgent Need for Smart Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data-driven insights revealing the challenges facing Kilimani and the critical need for intelligent
            community coordination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <MetricCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
              icon={stat.icon}
              color={stat.color}
              className="hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            These statistics highlight the urgent need for coordinated, intelligent solutions that can address multiple
            challenges simultaneously through AI-powered community management.
          </p>
        </div>
      </div>
    </section>
  )
}
