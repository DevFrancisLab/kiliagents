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
    gradient: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Resolved Today",
    value: "8",
    change: "+25%",
    trend: "up",
    icon: CheckCircle,
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Community Engagement",
    value: "1,247",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-30%",
    trend: "down",
    icon: Clock,
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className="group relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-xl border border-slate-200/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
        >
          {/* Decorative elements */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${metric.gradient} opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
            <CardTitle className="text-sm font-semibold text-slate-600">
              {metric.title}
            </CardTitle>
            <div className={`w-10 h-10 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
              <metric.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          
          <CardContent className="relative">
            <div className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
              {metric.value}
            </div>
            <div className="flex items-center text-sm">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${metric.bgColor} border ${metric.trend === "up" ? "border-green-200" : "border-green-200"}`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-600" />
                )}
                <span className="font-semibold text-green-700">{metric.change}</span>
              </div>
              <span className="text-slate-600 ml-2 font-medium">from last week</span>
            </div>
          </CardContent>
        </div>
      ))}
    </div>
  )
}