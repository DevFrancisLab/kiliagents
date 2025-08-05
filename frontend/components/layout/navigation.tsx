"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bot, Menu, X, Bell, User, Settings, LogOut, Home } from "lucide-react"
import Link from "next/link"
import { useUser, useClerk } from "@clerk/nextjs"
import { useNotifications } from "@/components/providers/notification-provider"
import { NotificationPanel } from "@/components/notifications/notification-panel"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const { unreadCount } = useNotifications()

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" })
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KiliAgents
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </Link>
              {user && (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Community
                  </Link>
                </>
              )}
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isLoaded && user ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className="relative" onClick={() => setShowNotifications(true)}>
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">{unreadCount}</Badge>
                    )}
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.imageUrl || "/placeholder.svg"}
                            alt={user.fullName || user.emailAddresses[0]?.emailAddress}
                          />
                          <AvatarFallback>
                            {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.fullName || `${user.firstName} ${user.lastName}`}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.emailAddresses[0]?.emailAddress}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <Home className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <Link href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Community
                    </Link>
                    <Button variant="outline" onClick={handleSignOut} className="w-fit bg-transparent">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" className="w-fit">
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild className="w-fit">
                      <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <NotificationPanel open={showNotifications} onOpenChange={setShowNotifications} />
    </>
  )
}
