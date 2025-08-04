import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Bot, CheckCircle, AlertTriangle, Users, Zap } from "lucide-react"

const activities = [
  {
    type: "resolution",
    icon: CheckCircle,
    message: "Water supply issue resolved on Kindaruma Rd",
    agent: "Development Agent",
    time: "5 min ago",
    color: "green",
  },
  {
    type: "alert",
    icon: AlertTriangle,
    message: "New construction permit requires review",
    agent: "Development Agent",
    time: "12 min ago",
    color: "yellow",
  },
  {
    type: "engagement",
    icon: Users,
    message: "Community meeting scheduled for tomorrow",
    agent: "Social Cohesion Agent",
    time: "25 min ago",
    color: "blue",
  },
  {
    type: "system",
    icon: Bot,
    message: "SME Support Agent completed maintenance",
    agent: "System",
    time: "1 hour ago",
    color: "gray",
  },
  {
    type: "resolution",
    icon: CheckCircle,
    message: "Air quality monitoring restored",
    agent: "Environment Agent",
    time: "2 hours ago",
    color: "green",
  },
  {
    type: "update",
    icon: Zap,
    message: "Safety protocols updated for emergency response",
    agent: "Safety Agent",
    time: "3 hours ago",
    color: "purple",
  },
]

const colorVariants = {
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  blue: "bg-blue-100 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
  purple: "bg-purple-100 text-purple-600",
}

export function RecentActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live System Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div
                  className={`p-2 rounded-full ${colorVariants[activity.color as keyof typeof colorVariants]} flex-shrink-0`}
                >
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900 font-medium">{activity.message}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span>{activity.agent}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
