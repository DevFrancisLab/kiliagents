import { Card, CardContent } from "@/components/ui/card"
import { Monitor, MapPin, Smartphone, Wifi, BarChart3, Bell, Zap } from "lucide-react"

const features = [
  {
    icon: Monitor,
    title: "Real-time Community Dashboard",
    description: "Comprehensive overview of community metrics, agent activities, and system status with live updates.",
    color: "blue",
  },
  {
    icon: MapPin,
    title: "Geo-tagged Issue Reporting",
    description: "Multi-channel reporting system supporting USSD, SMS, and mobile app with precise location tracking.",
    color: "green",
  },
  {
    icon: Wifi,
    title: "IoT Integration",
    description:
      "Connected sensors for environmental monitoring, traffic analysis, and infrastructure health assessment.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "AI-powered forecasting for resource planning, risk assessment, and proactive community management.",
    color: "yellow",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent alert system that notifies relevant stakeholders based on issue priority and context.",
    color: "red",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for mobile devices with offline capabilities and low-bandwidth connectivity support.",
    color: "blue",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Platform Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Feature Set</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced tools and capabilities designed for effective community management, stakeholder engagement, and
            intelligent problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience the Future?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of community members already using KiliAgents to create smarter, more connected
              neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">5 AI Agents Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">1,247+ Community Members</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
