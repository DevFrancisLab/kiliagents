import LiveUpdates from "@/components/dashboard/LiveUpdates";

export function RecentActivity() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
      </div>
      <div className="flex-1 overflow-hidden">
        <LiveUpdates />
      </div>
    </div>
  );
}
