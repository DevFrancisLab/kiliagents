"use client";

import { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { Loader2, Image as ImageIcon, MapPin } from "lucide-react";

interface Issue {
  id: number;
  description: string;
  latitude: number;
  longitude: number;
  category: string;
  status: string;
  proof: string | null;
  place_name?: string;
  created_at?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  development: "#6366f1",
  environment: "#22c55e",
  social: "#f59e42",
  sme: "#eab308",
  safety: "#ef4444",
};

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  development: <MapPin className="w-5 h-5 text-indigo-500" />, // You can swap for a better icon
  environment: <MapPin className="w-5 h-5 text-green-500" />, // Swap for leaf/tree
  social: <MapPin className="w-5 h-5 text-orange-500" />, // Swap for users
  sme: <MapPin className="w-5 h-5 text-yellow-500" />, // Swap for briefcase
  safety: <MapPin className="w-5 h-5 text-red-500" />, // Swap for shield/alert
};

function timeAgo(dateString?: string) {
  if (!dateString) return "just now";
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function LiveUpdates() {
  const { fetchIssues } = useApi();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth continuous scroll effect
  useEffect(() => {
    if (!issues.length) return;
    let frameId: number;
    let lastTs: number | null = null;
    const speed = 0.5; // px per ms (tune for desired speed)
    const scroll = (ts: number) => {
      if (isPaused) {
        lastTs = ts;
        frameId = requestAnimationFrame(scroll);
        return;
      }
      if (scrollRef.current) {
        if (lastTs !== null) {
          const delta = ts - lastTs;
          scrollRef.current.scrollTop += delta * speed;
          // Loop
          if (
            scrollRef.current.scrollTop >=
            scrollRef.current.scrollHeight / 2
          ) {
            scrollRef.current.scrollTop = 0;
          }
        }
      }
      lastTs = ts;
      frameId = requestAnimationFrame(scroll);
    };
    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [issues, isPaused]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchIssues()
      .then((data) => {
        if (mounted) setIssues(data);
      })
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [fetchIssues]);

  return (
    <aside
      className="w-full h-full bg-white border-l md:border rounded-lg shadow-lg overflow-hidden flex flex-col"
      style={{ minWidth: 280 }}
    >
      <div className="px-4 py-2 bg-blue-50 border-b font-semibold text-blue-800 text-lg tracking-tight">
        Live System Updates
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth px-2 py-2 space-y-3"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full text-blue-600">
            <Loader2 className="animate-spin mr-2" /> Loading...
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No issues reported yet.</div>
        ) : (
          issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow hover:shadow-md transition border border-gray-100"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full"
                style={{ background: CATEGORY_COLORS[issue.category] || "#e5e7eb" }}
              >
                {CATEGORY_ICONS[issue.category] || <MapPin className="w-5 h-5 text-gray-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-gray-800">
                  {issue.description}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {issue.place_name || `${issue.latitude.toFixed(4)}, ${issue.longitude.toFixed(4)}`}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{timeAgo(issue.created_at)}</div>
              </div>
              {issue.proof ? (
                <img
                  src={issue.proof}
                  alt="Proof"
                  className="w-12 h-12 object-cover rounded border border-gray-200 shadow-sm"
                  style={{ minWidth: 48, minHeight: 48 }}
                  onClick={() => window.open(issue.proof!, '_blank')}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
