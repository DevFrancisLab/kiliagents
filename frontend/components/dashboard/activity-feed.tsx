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
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`p-1 rounded-full bg-${activity.color}-100 mt-1`}>
                <activity.icon className={`h-3 w-3 text-${activity.color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900">{activity.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {activity.agent} • {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
