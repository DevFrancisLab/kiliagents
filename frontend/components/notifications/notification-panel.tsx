"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNotifications } from "@/components/providers/notification-provider"
import { CheckCircle, AlertTriangle, Info, X, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NotificationPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: "text-green-600 bg-green-100",
  warning: "text-yellow-600 bg-yellow-100",
  error: "text-red-600 bg-red-100",
  info: "text-blue-600 bg-blue-100",
}

export function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  const { notifications, markAsRead, clearAll } = useNotifications()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>Stay updated with community activities</SheetDescription>
            </div>
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
              <p className="text-sm text-gray-400 mt-1">We'll notify you when something happens</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      notification.read ? "bg-gray-50" : "bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${colorMap[notification.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
