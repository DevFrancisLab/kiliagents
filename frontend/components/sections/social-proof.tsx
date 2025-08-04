import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Kimani",
    role: "Community Leader",
    content: "KiliAgents transformed how we handle community issues. Response times improved by 60%!",
    rating: 5,
  },
  {
    name: "David Mwangi",
    role: "Local Business Owner",
    content: "Finally, a platform that actually works. Our neighborhood feels more connected than ever.",
    rating: 5,
  },
  {
    name: "Grace Wanjiku",
    role: "Resident",
    content: "Love how easy it is to report issues and track their progress. The AI agents are amazing!",
    rating: 5,
  },
]

export function SocialProof() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Loved by Communities</h2>
          <p className="text-xl text-gray-600">See what our users are saying about their experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-500 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">5 AI Agents Active</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">1,200+ Happy Users</span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
