import { StatusBadge } from "@/components/ui/status-badge"
import { Activity, Zap, Users, Shield, Leaf, Building } from "lucide-react"

const agents = [
  {
    name: "Development Agent",
    status: "active" as const,
    icon: Building,
    tasks: 12,
    performance: 98,
  },
  {
    name: "Environment Agent",
    status: "active" as const,
    icon: Leaf,
    tasks: 8,
    performance: 95,
  },
  {
    name: "Social Cohesion Agent",
    status: "active" as const,
    icon: Users,
    tasks: 15,
    performance: 92,
  },
  {
    name: "SME Support Agent",
    status: "maintenance" as const,
    icon: Zap,
    tasks: 0,
    performance: 0,
  },
  {
    name: "Safety Agent",
    status: "active" as const,
    icon: Shield,
    tasks: 6,
    performance: 97,
  },
]

export function AgentStatusGrid() {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Agent Network Status</h3>
        <p className="text-sm text-gray-600">AI agent performance monitor</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {agents.map((agent, index) => (
            <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                  <agent.icon className="h-4 w-4 text-blue-600" />
                </div>
                <StatusBadge status={agent.status} className="text-xs px-2 py-1">
                  {agent.status}
                </StatusBadge>
              </div>
              
              <h4 className="font-medium text-sm text-gray-900 mb-1">{agent.name}</h4>
              
              <div className="flex justify-between text-xs text-gray-600">
                <span>{agent.tasks} tasks</span>
                <span>{agent.performance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}