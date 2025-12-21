"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { NotificationToast } from "./notification-toast"

const NotificationContext = createContext(undefined)

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((notification) => {
    setToasts((prev) => [...prev, notification])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-[500px]">
        {toasts.map((toast) => (
          <NotificationToast key={toast.id} notification={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useToast() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useToast must be used within NotificationProvider")
  }
  return context
}
