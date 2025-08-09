import { Button } from "@/components/ui/button"
import { Bell, Home, Activity } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/20 rounded-2xl shadow-lg border border-slate-200/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              {/* Logo Container with Enhanced Styling */}
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/50 group-hover:ring-blue-300/60 transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
                <Image
                  src="/logo.jpg"
                  alt="KiliAgents Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  priority
                />
                {/* Gradient Overlay for Better Integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent"></div>
              </div>
              {/* Status Indicator */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg animate-pulse">
                <div className="absolute inset-1 bg-white rounded-full opacity-30 animate-ping"></div>
              </div>
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                KiliAgents Dashboard
              </h1>
              <p className="text-sm text-slate-600 font-medium">Kilimani community insights & AI-powered reporting</p>
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