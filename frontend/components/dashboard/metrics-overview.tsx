import { MetricCard } from "@/components/ui/metric-card"
import { AlertTriangle, CheckCircle, Users, Clock, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Community Reports",
    value: "23",
    change: "+5 this week",
    trend: "up" as const,
    icon: AlertTriangle,
    color: "blue" as const,
  },
  {
    title: "Issues Resolved",
    value: "8",
    change: "Today",
    trend: "up" as const,
    icon: CheckCircle,
    color: "green" as const,
  },
  {
    title: "Community Members",
    value: "1,247",
    change: "+18 this month",
    trend: "up" as const,
    icon: Users,
    color: "purple" as const,
  },
]

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const gradients = {
          green: 'from-emerald-500 to-green-600',
          blue: 'from-blue-500 to-indigo-600', 
          purple: 'from-purple-500 to-violet-600'
        };
        
        const bgColors = {
          green: 'from-emerald-50 to-green-50',
          blue: 'from-blue-50 to-indigo-50',
          purple: 'from-purple-50 to-violet-50'
        };
        
        return (
          <div key={index} className={`relative overflow-hidden bg-gradient-to-br ${bgColors[metric.color]} rounded-2xl shadow-lg border border-white/60 p-6 hover:shadow-xl transition-all duration-300 group`}>
            {/* Background decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[metric.color]} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:opacity-15 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[metric.color]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`h-4 w-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                  <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">{metric.title}</h3>
                <p className="text-3xl font-bold text-slate-900 group-hover:scale-105 transition-transform duration-300">{metric.value}</p>
                <p className="text-xs text-slate-600 font-medium">Active in your community</p>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  )
}