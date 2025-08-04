import { Bot, Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">KiliAgents</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered multi-agent platform for smarter communities. Building the future of urban coordination.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2 text-sm">
              <Link href="/dashboard" className="block text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/report" className="block text-gray-400 hover:text-white transition-colors">
                Report Issue
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                API Documentation
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Agent Network
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Partners
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 KiliAgents. All rights reserved. Built with ❤️ for smarter communities.</p>
        </div>
      </div>
    </footer>
  )
}
