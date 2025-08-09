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
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Modern Header */}
        <DashboardHeader />
        
        {/* Enhanced Metrics Overview */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800">Community Overview</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
          </div>
          <MetricsOverview />
        </div>

        {/* Main Content Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Community Map */}
          <div className="xl:col-span-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800">Community Map</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300">
                <CommunityMap />
              </div>
            </div>
          </div>
          
          {/* Right Column - Activity & Issues */}
          <div className="xl:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-800">Live Updates</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>
              
              {/* Recent Activity - Enhanced */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
                <RecentActivity />
              </div>
              
              {/* Issue Tracker - Enhanced */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300">
                <IssueTracker />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom spacing for floating elements */}
        <div className="h-20"></div>
      </div>
      
      {/* Floating Issue Reporter */}
      <FloatingIssueReporter />
    </DashboardLayout>
  )
}