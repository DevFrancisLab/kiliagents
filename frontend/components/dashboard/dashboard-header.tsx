import { Button } from "@/components/ui/button"
import { Bell, Home, Activity } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/20 rounded-2xl shadow-lg border border-slate-200/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Community Dashboard
              </h1>
              <p className="text-sm text-slate-600 font-medium">Kilimani community insights & reporting</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-green-200/60 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">
              System Online
            </span>
            <div className="w-1 h-4 bg-green-200 rounded-full"></div>
            <span className="text-xs text-slate-600">
              All services active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="default" className="h-10 px-4 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:shadow-md transition-all duration-200">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline font-medium">Notifications</span>
          </Button>
          <Button asChild variant="default" size="default" className="h-10 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}