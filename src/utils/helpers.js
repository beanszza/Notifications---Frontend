// Get color for notification type
export const getNotificationColor = (type) => {
  const colors = {
    success: '#2D5F3F',
    info: '#FF6B35',
    warning: '#F59E0B',
    delivery: '#3B82F6',
    error: '#DC2626'
  }
  return colors[type] || '#2D5F3F'
}

// Calculate time ago
export const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ago`
}