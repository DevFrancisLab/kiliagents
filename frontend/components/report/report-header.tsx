import { Button } from "@/components/ui/button"
import { Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ReportHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">KiliAgents</span>
            </Link>
            <div className="hidden md:block text-sm text-gray-500">Report Community Issue</div>
          </div>

          <Button asChild variant="ghost">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
