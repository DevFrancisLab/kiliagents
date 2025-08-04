import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "primary" | "secondary" | "accent" | "neutral"
  children: React.ReactNode
}

const gradientVariants = {
  primary: "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200",
  secondary: "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200",
  accent: "bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200",
  neutral: "bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200",
}

export function GradientCard({ gradient = "primary", className, children, ...props }: GradientCardProps) {
  return (
    <Card className={cn(gradientVariants[gradient], className)} {...props}>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}
