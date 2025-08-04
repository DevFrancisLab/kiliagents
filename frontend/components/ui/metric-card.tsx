import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
  color?: "blue" | "green" | "red" | "yellow" | "purple"
  className?: string
}

const colorVariants = {
  blue: "text-blue-600 bg-blue-100",
  green: "text-green-600 bg-green-100",
  red: "text-red-600 bg-red-100",
  yellow: "text-yellow-600 bg-yellow-100",
  purple: "text-purple-600 bg-purple-100",
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "blue",
  className,
}: MetricCardProps) {
  const isPositiveTrend = (trend === "up" && color === "green") || (trend === "down" && color === "red")

  return (
    <Card className={cn("hover:shadow-lg transition-all duration-200", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={cn("p-2 rounded-lg", colorVariants[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        {change && (
          <div className="flex items-center text-sm">
            {trend === "up" && <TrendingUp className="h-4 w-4 mr-1 text-green-600" />}
            {trend === "down" && <TrendingDown className="h-4 w-4 mr-1 text-green-600" />}
            <span className={cn("font-medium", isPositiveTrend ? "text-green-600" : "text-red-600")}>{change}</span>
            <span className="text-gray-500 ml-1">from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
