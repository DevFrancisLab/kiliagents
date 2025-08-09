"use client";

import { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { Loader2, Image as ImageIcon, MapPin, Building2, Leaf, Users, Briefcase, Shield, Clock, Activity } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  development: <Building2 className="w-5 h-5 text-white" />,
  environment: <Leaf className="w-5 h-5 text-white" />,
  social: <Users className="w-5 h-5 text-white" />,
  sme: <Briefcase className="w-5 h-5 text-white" />,
  safety: <Shield className="w-5 h-5 text-white" />,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  development: "from-indigo-500 to-purple-600",
  environment: "from-green-500 to-emerald-600", 
  social: "from-orange-500 to-amber-600",
  sme: "from-yellow-500 to-orange-600",
  safety: "from-red-500 to-rose-600",
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Smooth continuous scroll effect
  useEffect(() => {
    if (!issues.length) return;
    let frameId: number;
    let lastTs: number | null = null;
    const speed = 0.2; // px per ms (tune for desired speed)
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

  // Polling for real-time updates
  useEffect(() => {
    const fetchData = () => {
      fetchIssues()
        .then((data) => {
          // Sort by creation time to ensure newest are at the bottom
          const sortedData = data.sort((a: Issue, b: Issue) => 
            new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
          );
          setIssues(sortedData);
        })
        .catch(err => console.error("Failed to fetch issues:", err)) // Optional: better error handling
        .finally(() => setLoading(false));
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchIssues]);

  return (
    <aside
      className="relative overflow-hidden w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-lg flex flex-col"
      style={{ minWidth: 340, height: '400px' }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full -translate-y-10 translate-x-10"></div>
      
      {/* Simplified header */}
      <div className="relative px-4 py-3 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Live Updates
            </h3>
            <p className="text-slate-600 text-xs">
              Real-time community reports
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-600 text-xs">Live</span>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden relative"
        style={{ 
          height: '494px',
          background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for seamless scroll */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/95 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/95 to-transparent z-10 pointer-events-none"></div>
        
        <div className="px-6 py-4 space-y-4">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full text-slate-600">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-12 h-12 border-2 border-blue-300 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="font-semibold text-lg text-slate-700">Loading updates...</p>
              <p className="text-sm text-slate-500 mt-1">Fetching the latest reports</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-slate-500">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-10 h-10 text-slate-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <p className="font-semibold text-lg text-slate-700 mb-1">No issues reported yet</p>
              <p className="text-sm text-slate-500 text-center max-w-xs">
                Community reports will appear here in real-time as they are submitted
              </p>
            </div>
          ) : (
            // Duplicate issues for seamless infinity scroll
            [...issues, ...issues].map((issue, index) => (
              <div
                key={`${issue.id}-${index}`}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/60 hover:border-slate-300/80 hover:bg-white/95 overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${CATEGORY_GRADIENTS[issue.category] || 'from-slate-400 to-slate-500'} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative flex items-start gap-5">
                  {/* Enhanced category icon */}
                  <div className="flex-shrink-0 relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${CATEGORY_GRADIENTS[issue.category] || 'from-slate-400 to-slate-500'} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}
                      style={{ 
                        boxShadow: `0 8px 25px ${CATEGORY_COLORS[issue.category] || "#e5e7eb"}30`
                      }}
                    >
                      {CATEGORY_ICONS[issue.category] || <MapPin className="w-6 h-6 text-white" />}
                    </div>
                    
                    {/* Pulse rings */}
                    <div 
                      className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle, ${CATEGORY_COLORS[issue.category] || "#e5e7eb"}20, transparent 60%)`,
                        animation: 'pulse 3s infinite'
                      }}
                    ></div>
                    
                    {/* Status indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                  </div>

                  {/* Enhanced content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 mb-3 leading-relaxed text-base group-hover:text-slate-900 transition-colors">
                      {issue.description}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="truncate font-medium">
                        {issue.place_name || "Location not specified"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className={`px-3 py-1.5 bg-gradient-to-r ${CATEGORY_GRADIENTS[issue.category] || 'from-slate-400 to-slate-500'} rounded-xl text-xs font-semibold text-white shadow-md`}>
                        {issue.category.toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>{timeAgo(issue.created_at)}</span>
                      </div>
                      <div className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-600 font-medium">
                        ID: {issue.id}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced proof image */}
                  <div className="flex-shrink-0">
                    {issue.proof ? (
                      <div className="relative group/image">
                        <img
                          src={`http://127.0.0.1:8000${issue.proof}`}
                          alt="Issue proof"
                          className="w-18 h-18 object-cover rounded-2xl border-3 border-white shadow-lg cursor-pointer transition-all duration-500 group-hover/image:shadow-2xl group-hover/image:scale-110"
                          style={{ minWidth: 72, minHeight: 72 }}
                          onClick={() => setSelectedImage(`http://127.0.0.1:8000${issue.proof}`)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-end justify-center pb-2">
                          <ImageIcon className="w-5 h-5 text-white drop-shadow-lg" />
                        </div>
                        {/* Image border glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover/image:opacity-50 transition-opacity duration-300 -z-10 blur-sm"></div>
                      </div>
                    ) : (
                      <div className="w-18 h-18 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-2xl border-3 border-white shadow-lg">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Enhanced image dialog */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-white/95 backdrop-blur-lg border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Issue Proof Image
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                High-resolution view of the submitted evidence
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected proof image" 
                className="max-w-full h-auto rounded-xl shadow-2xl border border-slate-200" 
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </aside>
  );
}