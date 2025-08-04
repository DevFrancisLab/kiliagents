import { Card, CardContent } from "@/components/ui/card"
import { Monitor, MapPin, Smartphone, Wifi, BarChart3, Bell } from "lucide-react"

const features = [
  {
    icon: Monitor,
    title: "Real-time Community Dashboard",
    description: "Comprehensive overview of community metrics, agent activities, and system status with live updates.",
  },
  {
    icon: MapPin,
    title: "Geo-tagged Issue Reporting",
    description: "Multi-channel reporting system supporting USSD, SMS, and mobile app with precise location tracking.",
  },
  {
    icon: Wifi,
    title: "IoT Integration",
    description:
      "Connected sensors for environmental monitoring, traffic analysis, and infrastructure health assessment.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "AI-powered forecasting for resource planning, risk assessment, and proactive community management.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent alert system that notifies relevant stakeholders based on issue priority and context.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Optimized for mobile devices with offline capabilities and low-bandwidth connectivity support.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and capabilities designed for effective community management and stakeholder engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
