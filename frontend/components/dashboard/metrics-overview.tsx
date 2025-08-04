import { MetricCard } from "@/components/ui/metric-card"
import { AlertTriangle, CheckCircle, Users, Clock, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Active Issues",
    value: "23",
    change: "-12%",
    trend: "down" as const,
    icon: AlertTriangle,
    color: "red" as const,
  },
  {
    title: "Resolved Today",
    value: "8",
    change: "+25%",
    trend: "up" as const,
    icon: CheckCircle,
    color: "green" as const,
  },
  {
    title: "Community Engagement",
    value: "1,247",
    change: "+18%",
    trend: "up" as const,
    icon: Users,
    color: "blue" as const,
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-30%",
    trend: "down" as const,
    icon: Clock,
    color: "green" as const,
  },
]

export function MetricsOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Community Metrics</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  )
}
