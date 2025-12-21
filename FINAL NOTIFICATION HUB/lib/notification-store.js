class NotificationStore {
  constructor() {
    this.notifications = new Map()
    this.listeners = new Set()
    // Initialize with some sample notifications
    this.seedData()
  }

  seedData() {
    const sampleNotifications = [
      {
        type: "success",
        category: "customer",
        title: "Order Delivered",
        message: "Your order #12345 has been delivered successfully",
        read: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        type: "info",
        category: "customer",
        title: "Order Preparing",
        message: "Your order is being prepared",
        read: true,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        type: "delivery",
        category: "rider",
        title: "New Delivery",
        message: "New delivery assigned: Order #12345",
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 1000),
      },
    ]

    sampleNotifications.forEach((notif) => {
      const id = this.generateId()
      this.notifications.set(id, { ...notif, id })
    })
  }

  generateId() {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  create(event) {
    const notification = {
      id: this.generateId(),
      ...event,
      read: false,
      createdAt: new Date(),
    }

    this.notifications.set(notification.id, notification)
    this.notifyListeners()
    return notification
  }

  getAll(userId) {
    const allNotifications = Array.from(this.notifications.values())

    if (userId) {
      return allNotifications
        .filter((n) => !n.userId || n.userId === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }

    return allNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getById(id) {
    return this.notifications.get(id)
  }

  markAsRead(id) {
    const notification = this.notifications.get(id)
    if (notification) {
      notification.read = true
      this.notifyListeners()
      return true
    }
    return false
  }

  markAllAsRead(userId) {
    let count = 0
    this.notifications.forEach((notification) => {
      if (!notification.read && (!userId || notification.userId === userId)) {
        notification.read = true
        count++
      }
    })
    this.notifyListeners()
    return count
  }

  delete(id) {
    const result = this.notifications.delete(id)
    if (result) {
      this.notifyListeners()
    }
    return result
  }

  getUnreadCount(userId) {
    return this.getAll(userId).filter((n) => !n.read).length
  }
}

// Singleton instance
export const notificationStore = new NotificationStore()
