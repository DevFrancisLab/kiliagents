import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageCircle } from "lucide-react"

const topics = [
  {
    title: "Water Infrastructure",
    posts: 23,
    trend: "up",
  },
  {
    title: "Community Safety",
    posts: 18,
    trend: "up",
  },
  {
    title: "Local Business Support",
    posts: 15,
    trend: "stable",
  },
  {
    title: "Environmental Issues",
    posts: 12,
    trend: "up",
  },
  {
    title: "Traffic Management",
    posts: 9,
    trend: "down",
  },
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div>
              <div className="font-medium text-gray-900">{topic.title}</div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MessageCircle className="h-3 w-3" />
                {topic.posts} posts
              </div>
            </div>
            <Badge variant={topic.trend === "up" ? "default" : topic.trend === "down" ? "destructive" : "secondary"}>
              {topic.trend === "up" ? "↗" : topic.trend === "down" ? "↘" : "→"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
