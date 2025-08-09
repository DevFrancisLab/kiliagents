import LiveUpdates from "@/components/dashboard/LiveUpdates";
import { Activity } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
          <Activity className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
          <p className="text-xs text-slate-600">Live community updates</p>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <LiveUpdates />
      </div>
    </div>
  );
}