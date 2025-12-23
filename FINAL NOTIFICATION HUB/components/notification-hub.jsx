"use client"

import { useState } from "react"
import { useNotifications } from "@/hooks/use-notifications"
import { X, Bell, Check, Trash2 } from "lucide-react"

export function NotificationHub({ isOpen, onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [filter, setFilter] = useState("all")

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getTypeColor = (type) => {
    const colors = {
      success: "#2D5F3F",
      info: "#FF6B35",
      warning: "#F59E0B",
      delivery: "#3B82F6",
      error: "#DC2626",
    }
    return colors[type] || "#3B302A"
  }

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 10) return "just now"
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-40 animate-fade-in" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-primary px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-contrast" />
            <h2 className="dm-bold text-2xl text-contrast">Notifications</h2>
          </div>
          <button onClick={onClose} className="text-contrast hover:opacity-80 transition-opacity p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controls */}
        <div className="bg-soft-neutral border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg dm-medium text-sm transition-colors ${
                filter === "all" ? "bg-primary text-contrast" : "bg-gray-100 text-primary hover:bg-gray-200"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg dm-medium text-sm transition-colors ${
                filter === "unread" ? "bg-primary text-contrast" : "bg-gray-100 text-primary hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markAllAsRead()}
              className="flex items-center gap-2 text-info hover:opacity-80 transition-opacity pjs-medium text-sm"
            >
              <Check className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Bell className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="dm-bold text-xl text-secondary mb-2">No notifications</h3>
              <p className="pjs-regular text-secondary">
                {filter === "unread" ? "You're all caught up!" : "You'll see notifications here when you receive them"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-blue-50/30" : ""
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex gap-4">
                    {/* Status indicator */}
                    <div className="flex-shrink-0 pt-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getTypeColor(notification.type) }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className="dm-bold text-base text-primary">{notification.title}</h4>
                        {!notification.read && <span className="flex-shrink-0 w-2 h-2 bg-info rounded-full mt-1.5" />}
                      </div>
                      <p className="pjs-regular text-sm text-secondary mb-2 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="pjs-regular text-xs text-placeholder">
                          {getTimeAgo(notification.createdAt)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="text-gray-400 hover:text-error transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
