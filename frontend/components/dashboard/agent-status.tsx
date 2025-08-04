import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Activity, Zap, Users, Shield, Leaf } from "lucide-react"

const agents = [
  {
    name: "Development Agent",
    status: "active",
    icon: Bot,
    tasks: 12,
    lastAction: "Reviewed building permit #2847",
    performance: 98,
  },
  {
    name: "Environment Agent",
    status: "active",
    icon: Leaf,
    tasks: 8,
    lastAction: "Air quality alert issued for Kindaruma Rd",
    performance: 95,
  },
  {
    name: "Social Cohesion Agent",
    status: "active",
    icon: Users,
    tasks: 15,
    lastAction: "Facilitated community meeting",
    performance: 92,
  },
  {
    name: "SME Support Agent",
    status: "maintenance",
    icon: Zap,
    tasks: 0,
    lastAction: "System update in progress",
    performance: 0,
  },
  {
    name: "Safety Agent",
    status: "active",
    icon: Shield,
    tasks: 6,
    lastAction: "Emergency response coordinated",
    performance: 97,
  },
]

export function AgentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Agent Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <agent.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{agent.name}</div>
                  <div className="text-sm text-gray-600">{agent.lastAction}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{agent.tasks} tasks</div>
                  <div className="text-xs text-gray-600">{agent.performance}% performance</div>
                </div>
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>{agent.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
