import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Building2, Leaf, Users, Briefcase } from "lucide-react"

const issues = [
  {
    id: "ISS-001",
    title: "Water shortage on Kindaruma Road",
    location: "Kindaruma Rd, Block 12",
    priority: "high",
    status: "in-progress",
    time: "2 hours ago",
    agent: "Development Agent",
    category: "development",
    gradient: "from-indigo-500 to-purple-600",
    icon: Building2,
  },
  {
    id: "ISS-002",
    title: "Illegal construction reported",
    location: "Argwings Kodhek Rd",
    priority: "medium",
    status: "assigned",
    time: "4 hours ago",
    agent: "Development Agent",
    category: "development",
    gradient: "from-indigo-500 to-purple-600",
    icon: Building2,
  },
  {
    id: "ISS-003",
    title: "Air quality concerns",
    location: "Yaya Centre vicinity",
    priority: "medium",
    status: "resolved",
    time: "6 hours ago",
    agent: "Environment Agent",
    category: "environment",
    gradient: "from-green-500 to-emerald-600",
    icon: Leaf,
  },
  {
    id: "ISS-004",
    title: "SME displacement complaint",
    location: "Galana Plaza",
    priority: "low",
    status: "pending",
    time: "1 day ago",
    agent: "SME Support Agent",
    category: "sme",
    gradient: "from-yellow-500 to-orange-600",
    icon: Briefcase,
  },
]

export function RecentIssues() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-2xl border border-slate-200/60 backdrop-blur-sm">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-400/10 to-cyan-400/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Recent Issues
              </span>
              <p className="text-sm font-normal text-slate-600 mt-1">Latest community reports</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {issues.map((issue) => (
            <div 
              key={issue.id} 
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 hover:border-slate-300/80 overflow-hidden"
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${issue.gradient} opacity-5 rounded-full -translate-y-10 translate-x-10 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${issue.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                      <issue.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-100 rounded-md">
                      {issue.id}
                    </span>
                  </div>
                  
                  <div className="font-semibold text-slate-900 text-base mb-2 group-hover:text-slate-800 transition-colors">
                    {issue.title}
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{issue.location}</span>
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${issue.gradient} rounded-lg text-white text-xs font-semibold shadow-sm mb-2`}>
                    <span>Assigned to {issue.agent}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "secondary"
                    }
                    className={`text-xs font-semibold shadow-sm ${
                      issue.priority === "high" ? "bg-red-100 text-red-800 border-red-300 hover:bg-red-200" :
                      issue.priority === "medium" ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200" :
                      "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200"
                    }`}
                  >
                    {issue.priority}
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-semibold shadow-sm ${
                      issue.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-300' :
                      issue.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                      issue.status === 'assigned' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                      'bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {issue.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <div className="w-4 h-4 bg-slate-100 rounded-sm flex items-center justify-center">
                  <Clock className="h-3 w-3" />
                </div>
                <span className="font-medium">{issue.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
        
        {/* Summary footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>{issues.length} recent issues</span>
            </div>
            <span>Last updated: 30s ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}