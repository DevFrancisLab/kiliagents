import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, MapPin, Activity } from "lucide-react"

export function CommunityMap() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Community Map</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Activity Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg h-80 flex items-center justify-center overflow-hidden">
            {/* Map Placeholder Content */}
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-gray-700 font-medium mb-2">Interactive Community Map</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Real-time issue locations</div>
                <div>• Agent coverage areas</div>
                <div>• IoT sensor network</div>
                <div>• Community resources</div>
              </div>
            </div>

            {/* Simulated map pins with better positioning */}
            <div className="absolute top-6 left-12 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            <div className="absolute top-16 right-16 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            <div className="absolute bottom-12 left-20 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            <div className="absolute bottom-20 right-12 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>

            {/* Coverage areas */}
            <div className="absolute top-8 left-8 w-24 h-24 bg-blue-200/30 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-green-200/30 rounded-full"></div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Active Issues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Resolved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Monitoring</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
