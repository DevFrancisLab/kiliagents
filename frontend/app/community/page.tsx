import { CommunityLayout } from "@/components/community/community-layout"
import { CommunityFeed } from "@/components/community/community-feed"
import { CommunityStats } from "@/components/community/community-stats"
import { QuickActions } from "@/components/community/quick-actions"
import { TrendingTopics } from "@/components/community/trending-topics"

export default function CommunityPage() {
  return (
    <CommunityLayout>
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <CommunityStats />
          <CommunityFeed />
        </div>
        <div className="space-y-8">
          <QuickActions />
          <TrendingTopics />
        </div>
      </div>
    </CommunityLayout>
  )
}
