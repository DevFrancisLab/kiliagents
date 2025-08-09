import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"

import dynamic from 'next/dynamic';

const CommunityMap = dynamic(() => import('@/components/dashboard/community-map').then(mod => mod.CommunityMap), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-sm border h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

import { RecentActivity } from "@/components/dashboard/recent-activity"
import { IssueTracker } from "@/components/dashboard/issue-tracker-clean"
import { FloatingIssueReporter } from "@/components/dashboard/floating-issue-reporter";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <DashboardHeader />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Metrics Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full shadow-sm"></div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Community Overview
                </h2>
                <p className="text-slate-600 text-sm mt-1">Real-time community metrics and insights</p>
              </div>
            </div>
            <MetricsOverview />
          </section>

          {/* Main Dashboard Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Community Map - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Interactive Community Map
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">Click anywhere to report issues</p>
                </div>
              </div>
              <CommunityMap />
            </div>

            {/* Right Sidebar - Activity & Updates */}
            <div className="space-y-8">
              {/* Live Updates Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full shadow-sm"></div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Live Updates
                    </h3>
                    <p className="text-slate-600 text-xs mt-1">Real-time community activity</p>
                  </div>
                </div>
                <RecentActivity />
              </div>

              {/* Issue Tracker Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full shadow-sm"></div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Recent Issues
                    </h3>
                    <p className="text-slate-600 text-xs mt-1">Track community reports</p>
                  </div>
                </div>
                <IssueTracker />
              </div>
            </div>
          </section>

          {/* Bottom Spacing */}
          <div className="h-24"></div>
        </div>
      </div>
      
      {/* Floating Issue Reporter */}
      <FloatingIssueReporter />
    </DashboardLayout>
  )
}