import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const metrics = [
  {
    title: "Active Issues",
    value: "23",
    change: "-12%",
    trend: "down",
    icon: AlertTriangle,
    color: "red",
  },
  {
    title: "Resolved Today",
    value: "8",
    change: "+25%",
    trend: "up",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Community Engagement",
    value: "1,247",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-30%",
    trend: "down",
    icon: Clock,
    color: "purple",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 text-${metric.color}-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
              )}
              <span className="text-green-600">{metric.change}</span>
              <span className="ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
