import { StatusBadge } from "@/components/ui/status-badge"
import { MapPin, Clock, AlertTriangle, Building2, Leaf, Briefcase } from "lucide-react"

const issues = [
  {
    id: "ISS-001",
    title: "Water shortage on Kindaruma Road",
    location: "Kindaruma Rd, Block 12",
    priority: "high" as const,
    status: "in-progress" as const,
    time: "2 hours ago",
    agent: "Development Agent",
    gradient: "from-indigo-500 to-purple-600",
    icon: Building2,
  },
  {
    id: "ISS-002", 
    title: "Illegal construction reported",
    location: "Argwings Kodhek Rd",
    priority: "medium" as const,
    status: "pending" as const,
    time: "4 hours ago",
    agent: "Development Agent",
    gradient: "from-indigo-500 to-purple-600",
    icon: Building2,
  },
  {
    id: "ISS-003",
    title: "Air quality concerns",
    location: "Yaya Centre vicinity", 
    priority: "medium" as const,
    status: "resolved" as const,
    time: "6 hours ago",
    agent: "Environment Agent",
    gradient: "from-green-500 to-emerald-600",
    icon: Leaf,
  },
  {
    id: "ISS-004",
    title: "SME displacement complaint",
    location: "Galana Plaza",
    priority: "low" as const,
    status: "pending" as const,
    time: "1 day ago",
    agent: "SME Support Agent",
    gradient: "from-yellow-500 to-orange-600",
    icon: Briefcase,
  },
]

const priorityColors = {
  high: "border-red-500 bg-red-50",
  medium: "border-yellow-500 bg-yellow-50", 
  low: "border-blue-500 bg-blue-50",
}

export function IssueTracker() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Recent Issues</h3>
          <p className="text-xs text-slate-600">Community reports & updates</p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`group relative bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${priorityColors[issue.priority]} hover:bg-white/80`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 bg-gradient-to-br ${issue.gradient} rounded-md flex items-center justify-center`}>
                    <issue.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-100 rounded">
                    {issue.id}
                  </span>
                  <StatusBadge 
                    status={issue.status}
                    className={`text-xs px-2 py-1 ${
                      issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      issue.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {issue.status}
                  </StatusBadge>
                </div>
                
                <h4 className="font-semibold text-slate-800 mb-2 text-sm leading-tight">
                  {issue.title}
                </h4>
                
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{issue.time}</span>
                  </div>
                </div>
                
                <div className="text-xs text-slate-600">
                  <span className="font-medium">Assigned to:</span> {issue.agent}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 mt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span>{issues.filter(i => i.status !== 'resolved').length} active issues</span>
        </div>
        <span>Updated 2 min ago</span>
      </div>
    </div>
  )
}
