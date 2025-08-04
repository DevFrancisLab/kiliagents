import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Users, Shield, Leaf, Building } from "lucide-react"

const agents = [
  {
    name: "Development Agent",
    status: "active" as const,
    icon: Building,
    tasks: 12,
    performance: 98,
    lastAction: "Reviewed building permit #2847",
    color: "blue",
  },
  {
    name: "Environment Agent",
    status: "active" as const,
    icon: Leaf,
    tasks: 8,
    performance: 95,
    lastAction: "Air quality alert issued for Kindaruma Rd",
    color: "green",
  },
  {
    name: "Social Cohesion Agent",
    status: "active" as const,
    icon: Users,
    tasks: 15,
    performance: 92,
    lastAction: "Facilitated community meeting",
    color: "purple",
  },
  {
    name: "SME Support Agent",
    status: "maintenance" as const,
    icon: Zap,
    tasks: 0,
    performance: 0,
    lastAction: "System update in progress",
    color: "orange",
  },
  {
    name: "Safety Agent",
    status: "active" as const,
    icon: Shield,
    tasks: 6,
    performance: 97,
    lastAction: "Emergency response coordinated",
    color: "red",
  },
]

export function AgentStatusGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Agent Network Status</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${agent.color}-100`}>
                    <agent.icon className={`h-5 w-5 text-${agent.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                </div>
                <StatusBadge status={agent.status}>{agent.status}</StatusBadge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">{agent.lastAction}</div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Performance</span>
                  <span className="font-medium">{agent.performance}%</span>
                </div>
                <Progress value={agent.performance} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Tasks</span>
                <span className="font-medium">{agent.tasks}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
