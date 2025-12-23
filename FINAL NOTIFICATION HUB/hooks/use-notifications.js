"use client"

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useNotifications(userId) {
  const url = userId ? `/api/notifications?userId=${userId}` : "/api/notifications"

  const { data, error, mutate } = useSWR(url, fetcher, {
    refreshInterval: 5000, // Poll every 5 seconds
    revalidateOnFocus: true,
  })

  const notifications = data?.data || []
  const unreadCount = data?.unreadCount || 0

  const createNotification = async (event) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      })

      if (response.ok) {
        mutate() // Refresh the notifications list
        return await response.json()
      }
    } catch (error) {
      console.error("Failed to create notification:", error)
    }
  }

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })

      if (response.ok) {
        mutate() // Refresh the notifications list
      }
    } catch (error) {
      console.error("Failed to mark as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "POST",
      })

      if (response.ok) {
        mutate() // Refresh the notifications list
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error)
    }
  }

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate() // Refresh the notifications list
      }
    } catch (error) {
      console.error("Failed to delete notification:", error)
    }
  }

  return {
    notifications,
    unreadCount,
    isLoading: !error && !data,
    isError: error,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh: mutate,
  }
}
