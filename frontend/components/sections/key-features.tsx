import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, MapPin, Bell, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Monitor,
    title: "Live Dashboard",
    description: "Track community metrics and agent activities in real-time",
    action: "View Dashboard",
    href: "/dashboard",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "Smart Reporting",
    description: "Report issues with automatic location tagging and priority routing",
    action: "Report Issue",
    href: "/report",
    color: "green",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified about community updates and issue resolutions",
    action: "Enable Notifications",
    href: "#notifications",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "AI-powered insights for better community planning and decisions",
    action: "View Analytics",
    href: "#analytics",
    color: "orange",
  },
]

const colorVariants = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
}

export function KeyFeatures() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Everything You Need</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make community management effortless and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r ${colorVariants[feature.color as keyof typeof colorVariants]}`} />
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${colorVariants[feature.color as keyof typeof colorVariants]} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                      <Button asChild variant="outline" className="group-hover:bg-gray-50 bg-transparent">
                        <Link href={feature.href}>
                          {feature.action} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
