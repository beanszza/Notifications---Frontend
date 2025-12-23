"use client"

import { useEffect } from "react"

export function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

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
    return `${seconds}s ago`
  }

  return (
    <div
      className="min-w-[360px] bg-soft-neutral border-none shadow-lg rounded-md p-4 animate-slide-in-right"
      style={{ borderLeft: `8px solid ${getTypeColor(notification.type)}` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="pjs-medium text-sm text-primary">{notification.message}</div>
        <div className="pjs-regular text-xs text-secondary whitespace-nowrap">{getTimeAgo(notification.createdAt)}</div>
      </div>
    </div>
  )
}
