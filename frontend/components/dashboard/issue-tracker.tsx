import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { MapPin, Clock, AlertTriangle } from "lucide-react"

const issues = [
  {
    id: "ISS-001",
    title: "Water shortage on Kindaruma Road",
    location: "Kindaruma Rd, Block 12",
    priority: "high" as const,
    status: "in-progress" as const,
    time: "2 hours ago",
    agent: "Development Agent",
  },
  {
    id: "ISS-002",
    title: "Illegal construction reported",
    location: "Argwings Kodhek Rd",
    priority: "medium" as const,
    status: "pending" as const,
    time: "4 hours ago",
    agent: "Development Agent",
  },
  {
    id: "ISS-003",
    title: "Air quality concerns",
    location: "Yaya Centre vicinity",
    priority: "medium" as const,
    status: "resolved" as const,
    time: "6 hours ago",
    agent: "Environment Agent",
  },
  {
    id: "ISS-004",
    title: "SME displacement complaint",
    location: "Galana Plaza",
    priority: "low" as const,
    status: "pending" as const,
    time: "1 day ago",
    agent: "SME Support Agent",
  },
]

const priorityColors = {
  high: "border-red-500",
  medium: "border-yellow-500",
  low: "border-blue-500",
}

export function IssueTracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Recent Issues</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Community Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`border-l-4 ${priorityColors[issue.priority]} pl-4 py-3 hover:bg-gray-50 rounded-r-lg transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{issue.id}</span>
                      <StatusBadge status={issue.status}>{issue.status}</StatusBadge>
                    </div>
                    <div className="font-medium text-gray-900 mb-1">{issue.title}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {issue.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {issue.time}
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">Assigned to {issue.agent}</div>
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
