import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

const issues = [
  {
    id: "ISS-001",
    title: "Water shortage on Kindaruma Road",
    location: "Kindaruma Rd, Block 12",
    priority: "high",
    status: "in-progress",
    time: "2 hours ago",
    agent: "Development Agent",
  },
  {
    id: "ISS-002",
    title: "Illegal construction reported",
    location: "Argwings Kodhek Rd",
    priority: "medium",
    status: "assigned",
    time: "4 hours ago",
    agent: "Development Agent",
  },
  {
    id: "ISS-003",
    title: "Air quality concerns",
    location: "Yaya Centre vicinity",
    priority: "medium",
    status: "resolved",
    time: "6 hours ago",
    agent: "Environment Agent",
  },
  {
    id: "ISS-004",
    title: "SME displacement complaint",
    location: "Galana Plaza",
    priority: "low",
    status: "pending",
    time: "1 day ago",
    agent: "SME Support Agent",
  },
]

export function RecentIssues() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Recent Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{issue.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{issue.location}</div>
                  <div className="text-xs text-gray-500 mt-1">Assigned to {issue.agent}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant={
                      issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {issue.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {issue.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {issue.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
