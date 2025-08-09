import type React from "react"
import { Toaster } from "react-hot-toast";
import { Navigation } from "@/components/layout/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full -translate-x-64 -translate-y-64 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-400/8 to-cyan-400/8 rounded-full translate-x-64 translate-y-64 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-rose-400/6 to-orange-400/6 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] bg-gradient-to-r from-violet-400/6 to-pink-400/6 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(203, 213, 225, 0.6)',
            color: '#475569',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: {
            style: {
              background: 'rgba(236, 253, 245, 0.9)',
              color: '#065f46',
              border: '1px solid rgba(134, 239, 172, 0.6)',
            },
          },
          error: {
            style: {
              background: 'rgba(254, 226, 226, 0.9)',
              color: '#991b1b',
              border: '1px solid rgba(252, 165, 165, 0.6)',
            },
          },
        }}
      />
      <Navigation />
      <main className="relative container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}