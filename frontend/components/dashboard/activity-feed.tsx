import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Bot, CheckCircle, AlertTriangle, Users } from "lucide-react"

const activities = [
  {
    type: "resolution",
    icon: CheckCircle,
    message: "Water supply issue resolved on Kindaruma Rd",
    agent: "Development Agent",
    time: "5 min ago",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    type: "alert",
    icon: AlertTriangle,
    message: "New construction permit requires review",
    agent: "Development Agent",
    time: "12 min ago",
    color: "yellow",
    gradient: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    type: "engagement",
    icon: Users,
    message: "Community meeting scheduled for tomorrow",
    agent: "Social Cohesion Agent",
    time: "25 min ago",
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    type: "system",
    icon: Bot,
    message: "SME Support Agent completed maintenance",
    agent: "System",
    time: "1 hour ago",
    color: "gray",
    gradient: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
  },
  {
    type: "resolution",
    icon: CheckCircle,
    message: "Air quality monitoring restored",
    agent: "Environment Agent",
    time: "2 hours ago",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
]

export function ActivityFeed() {
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
                Activity Feed
              </span>
              <p className="text-sm font-normal text-slate-600 mt-1">Recent system updates</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/60 hover:border-slate-300/80 overflow-hidden"
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${activity.gradient} opacity-5 rounded-full -translate-y-12 translate-x-12 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <activity.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 mb-2 leading-relaxed group-hover:text-slate-900 transition-colors">
                    {activity.message}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-3 py-1.5 bg-gradient-to-r ${activity.gradient} text-white rounded-lg text-xs font-semibold shadow-sm`}>
                        {activity.agent}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        
        {/* Progress indicator */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live updates active</span>
            </div>
            <span>{activities.length} recent activities</span>
          </div>
        </div>
      </div>
    </div>
  )
}