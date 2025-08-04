import type React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "active" | "inactive" | "maintenance" | "error" | "pending" | "resolved" | "in-progress"
  children: React.ReactNode
  className?: string
}

const statusVariants = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-orange-100 text-orange-800 border-orange-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(statusVariants[status], className)}>
      {children}
    </Badge>
  )
}
