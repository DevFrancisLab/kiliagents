import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { AgentStatusGrid } from "@/components/dashboard/agent-status-grid"
import { CommunityMap } from "@/components/dashboard/community-map"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { IssueTracker } from "@/components/dashboard/issue-tracker"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />
        <MetricsOverview />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AgentStatusGrid />
            <CommunityMap />
          </div>

          <div className="space-y-8">
            <IssueTracker />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
