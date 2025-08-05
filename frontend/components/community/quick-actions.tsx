import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, Calendar, Users, MessageSquare } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Report Issue",
    description: "Report a community problem",
    icon: AlertTriangle,
    href: "/report",
    color: "red",
  },
  {
    title: "Create Event",
    description: "Organize community gathering",
    icon: Calendar,
    href: "/events/create",
    color: "blue",
  },
  {
    title: "Start Discussion",
    description: "Begin a community conversation",
    icon: MessageSquare,
    href: "/discussions/create",
    color: "green",
  },
  {
    title: "Join Group",
    description: "Connect with neighbors",
    icon: Users,
    href: "/groups",
    color: "purple",
  },
]

const colorVariants = {
  red: "hover:bg-red-50 border-red-200",
  blue: "hover:bg-blue-50 border-blue-200",
  green: "hover:bg-green-50 border-green-200",
  purple: "hover:bg-purple-50 border-purple-200",
}

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            asChild
            variant="outline"
            className={`w-full justify-start h-auto p-4 ${colorVariants[action.color as keyof typeof colorVariants]}`}
          >
            <Link href={action.href}>
              <div className="flex items-center gap-3">
                <action.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
