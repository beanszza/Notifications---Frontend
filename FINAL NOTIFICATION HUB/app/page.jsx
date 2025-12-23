"use client"

import { useState, useEffect } from "react"
import { NotificationHub } from "@/components/notification-hub"
import { useNotifications } from "@/hooks/use-notifications"
import { useToast } from "@/components/notification-provider"
import { Bell } from "lucide-react"

export default function Page() {
  const [isHubOpen, setIsHubOpen] = useState(false)
  const { notifications, unreadCount, createNotification } = useNotifications()
  const { showToast } = useToast()

  // Show toast when new notification arrives
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0]
      const now = new Date()
      const diff = now.getTime() - new Date(latestNotification.createdAt).getTime()

      // Only show toast for very recent notifications (within 2 seconds)
      if (!latestNotification.read && diff < 2000) {
        showToast(latestNotification)
      }
    }
  }, [notifications, showToast])

  const handleCreateNotification = async (type, category, title, message) => {
    await createNotification({
      type,
      category,
      title,
      message,
    })
  }

  const customerNotifications = [
    { type: "success", title: "Account Created", message: "Your account is successfully created" },
    { type: "success", title: "Added to Cart", message: "Item successfully added to cart" },
    { type: "success", title: "Payment Success", message: "Successful payment" },
    { type: "error", title: "Payment Failed", message: "Payment failed" },
    { type: "info", title: "Order Preparing", message: "Your order is being prepared" },
    { type: "info", title: "Ready for Pickup", message: "Your order is ready for pickup" },
    { type: "error", title: "Order Failed", message: "Your order has failed" },
    { type: "delivery", title: "Out for Delivery", message: "Your order is out for delivery" },
    { type: "success", title: "Delivered", message: "Your order has been delivered" },
    { type: "warning", title: "Order Cancelled", message: "Your order has been cancelled" },
    { type: "success", title: "Refund Processed", message: "Your refund has been processed" },
  ]

  const riderNotifications = [
    { type: "delivery", title: "New Delivery", message: "New delivery assigned: Order #1" },
    { type: "success", title: "Pickup Confirmed", message: "Pickup confirmed for Order #1" },
    { type: "success", title: "Delivery Complete", message: "Order #1 is delivered successfully" },
    { type: "info", title: "Feedback Received", message: "Customer feedback received for Order #1" },
  ]

  const adminNotifications = [
    { type: "info", title: "New Order", message: "New order received: Order #1 from Customer 1" },
    {
      type: "warning",
      title: "Cancellation Request",
      message: "Cancellation request for Order #1 from Customer 1",
    },
    { type: "success", title: "Menu Updated", message: "Product 1 is added successfully" },
    { type: "success", title: "Product Updated", message: "Product 3 has been updated successfully" },
    { type: "warning", title: "Product Removed", message: "Product 1 is removed from MENU" },
    { type: "error", title: "Payment Failed", message: "Payment failed for Order #1" },
    { type: "warning", title: "Order Cancelled", message: "Order #1 was cancelled by Customer 1" },
    { type: "warning", title: "Refund Requested", message: "Refund requested for Order #1" },
    { type: "success", title: "Refund Approved", message: "Refund approved for Order #1" },
  ]

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Fixed Notification Bell */}
      <button
        onClick={() => setIsHubOpen(true)}
        className="fixed top-6 right-6 z-30 bg-primary text-contrast rounded-full p-4 shadow-lg hover:scale-105 transition-transform"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-info text-contrast text-xs dm-bold rounded-full w-6 h-6 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Hub Sidebar */}
      <NotificationHub isOpen={isHubOpen} onClose={() => setIsHubOpen(false)} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="dm-bold text-5xl text-primary mb-4">Notification Hub Demo</h1>
          <p className="pjs-regular text-lg text-secondary max-w-2xl mx-auto">
            Click buttons to create notifications. They'll appear as toasts and be saved in the notification hub. Click
            the bell icon in the top right to view your notification inbox.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          {/* Customer */}
          <section>
            <h2 className="dm-bold text-2xl text-primary mb-6 text-center">Customer Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customerNotifications.map((notif, index) => (
                <button
                  key={`customer-${index}`}
                  onClick={() =>
                    handleCreateNotification(notif.type, "customer", notif.title, notif.message)
                  }
                  className="bg-primary text-contrast px-6 py-4 rounded-lg pjs-medium text-sm hover:scale-105 transition-transform shadow-md text-left"
                >
                  {notif.message}
                </button>
              ))}
            </div>
          </section>

          {/* Rider */}
          <section>
            <h2 className="dm-bold text-2xl text-primary mb-6 text-center">Rider Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {riderNotifications.map((notif, index) => (
                <button
                  key={`rider-${index}`}
                  onClick={() =>
                    handleCreateNotification(notif.type, "rider", notif.title, notif.message)
                  }
                  className="bg-info text-contrast px-6 py-4 rounded-lg pjs-medium text-sm hover:scale-105 transition-transform shadow-md text-left"
                >
                  {notif.message}
                </button>
              ))}
            </div>
          </section>

          {/* Admin */}
          <section>
            <h2 className="dm-bold text-2xl text-primary mb-6 text-center">Admin Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminNotifications.map((notif, index) => (
                <button
                  key={`admin-${index}`}
                  onClick={() =>
                    handleCreateNotification(notif.type, "admin", notif.title, notif.message)
                  }
                  className="bg-success text-contrast px-6 py-4 rounded-lg pjs-medium text-sm hover:scale-105 transition-transform shadow-md text-left"
                >
                  {notif.message}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
