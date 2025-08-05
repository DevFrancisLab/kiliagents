import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, CheckCircle, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Active Members",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "blue",
  },
  {
    title: "Discussions",
    value: "89",
    change: "+23%",
    icon: MessageSquare,
    color: "green",
  },
  {
    title: "Issues Resolved",
    value: "156",
    change: "+8%",
    icon: CheckCircle,
    color: "purple",
  },
  {
    title: "Engagement",
    value: "94%",
    change: "+5%",
    icon: TrendingUp,
    color: "orange",
  },
]

const colorVariants = {
  blue: "text-blue-600 bg-blue-100",
  green: "text-green-600 bg-green-100",
  purple: "text-purple-600 bg-purple-100",
  orange: "text-orange-600 bg-orange-100",
}

export function CommunityStats() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} this week</p>
              </div>
              <div className={`p-3 rounded-lg ${colorVariants[stat.color as keyof typeof colorVariants]}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
