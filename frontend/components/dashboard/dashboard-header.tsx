import { Button } from "@/components/ui/button"
import { Bell, Settings, Home } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">System Status: All Agents Active</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Community Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time insights and AI agent coordination for Kilimani community</p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
