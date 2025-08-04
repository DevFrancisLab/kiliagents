import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Zap, Users, Shield } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Instant Response",
    description: "Report issues and get immediate AI-powered coordination",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with neighbors and local authorities seamlessly",
  },
  {
    icon: Shield,
    title: "Always Secure",
    description: "Your data is protected with enterprise-grade security",
  },
]

export function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-600">KiliAgents</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of community management with intelligent coordination and real-time solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Proven Results</h3>
            <p className="text-gray-600">Real impact in communities using KiliAgents</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">50%</span>
              </div>
              <p className="text-sm text-gray-600">Faster Issue Resolution</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">85%</span>
              </div>
              <p className="text-sm text-gray-600">Community Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">24/7</span>
              </div>
              <p className="text-sm text-gray-600">AI Monitoring</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">100%</span>
              </div>
              <p className="text-sm text-gray-600">Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
