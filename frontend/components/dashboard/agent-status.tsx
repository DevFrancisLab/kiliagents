import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Activity, Zap, Users, Shield, Leaf, Building2 } from "lucide-react"

const agents = [
  {
    name: "Development Agent",
    status: "active",
    icon: Building2,
    tasks: 12,
    lastAction: "Reviewed building permit #2847",
    performance: 98,
    gradient: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    name: "Environment Agent",
    status: "active",
    icon: Leaf,
    tasks: 8,
    lastAction: "Air quality alert issued for Kindaruma Rd",
    performance: 95,
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    name: "Social Cohesion Agent",
    status: "active",
    icon: Users,
    tasks: 15,
    lastAction: "Facilitated community meeting",
    performance: 92,
    gradient: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    name: "SME Support Agent",
    status: "maintenance",
    icon: Zap,
    tasks: 0,
    lastAction: "System update in progress",
    performance: 0,
    gradient: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    name: "Safety Agent",
    status: "active",
    icon: Shield,
    tasks: 6,
    lastAction: "Emergency response coordinated",
    performance: 97,
    gradient: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
]

export function AgentStatus() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-2xl border border-slate-200/60 backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-cyan-400/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Agent Status
              </span>
              <p className="text-sm font-normal text-slate-600 mt-1">AI agent performance monitor</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {agents.map((agent, index) => (
            <div 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:border-slate-300/80 overflow-hidden"
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${agent.gradient} opacity-5 rounded-full -translate-y-12 translate-x-12 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${agent.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <agent.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 ${agent.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'} rounded-full border-2 border-white shadow-md`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
                      {agent.name}
                    </div>
                    <div className="text-sm text-slate-600 mb-2 leading-relaxed">
                      {agent.lastAction}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-800">{agent.tasks}</div>
                    <div className="text-xs text-slate-600 font-medium">active tasks</div>
                    <div className="text-sm font-semibold text-slate-700 mt-1">{agent.performance}%</div>
                    <div className="text-xs text-slate-500">performance</div>
                  </div>
                  <Badge 
                    variant={agent.status === "active" ? "default" : "secondary"}
                    className={`${agent.status === "active" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300" 
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                    } px-3 py-1 font-semibold shadow-sm`}
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        
        {/* Summary footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{agents.filter(a => a.status === 'active').length} agents active</span>
            </div>
            <span>Last updated: just now</span>
          </div>
        </div>
      </div>
    </div>
  )
}