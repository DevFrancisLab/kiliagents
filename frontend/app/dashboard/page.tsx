import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { AgentStatusGrid } from "@/components/dashboard/agent-status-grid"
import dynamic from 'next/dynamic';

const CommunityMap = dynamic(() => import('@/components/dashboard/community-map').then(mod => mod.CommunityMap), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { IssueTracker } from "@/components/dashboard/issue-tracker"
import IssueReporter from "@/components/dashboard/IssueReporter";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6 h-full">
        <DashboardHeader />
        
        {/* Metrics Overview - Full width on all screens */}
        <MetricsOverview />

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Column: Agent Status and Map */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <AgentStatusGrid />
            <div className="flex-1 h-full">
              <CommunityMap />
            </div>
          </div>
          
          {/* Right Column: Activity Feed & Issue Tracker */}
          <div className="space-y-6 flex flex-col">
            <div className="flex-none mb-6">
              <IssueReporter />
            </div>
            <div className="flex-1">
              <RecentActivity />
            </div>
            <div className="flex-none">
              <IssueTracker />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
