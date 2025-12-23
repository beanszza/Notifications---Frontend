// Customer notifications (11 total)
export const customerNotifications = [
  // AUTHENTICATION
  { type: 'success', message: 'Your account is successfully created' },
  
  // MENU/CART
  { type: 'success', message: 'Item successfully added to cart' },
  
  // PAYMENT
  { type: 'success', message: 'Successful payment' },
  { type: 'error', message: 'Payment failed' },
  
  // ORDER STATUS
  { type: 'info', message: 'Your order is being prepared' },
  { type: 'info', message: 'Your order is ready for pickup' },
  { type: 'error', message: 'Your order has failed' },
  { type: 'delivery', message: 'Your order is out for delivery' },
  { type: 'success', message: 'Your order has been delivered' },
  
  // CANCELLATION/REFUND
  { type: 'warning', message: 'Your order has been cancelled' },
  { type: 'success', message: 'Your refund has been processed' }
]

// Rider notifications (4 total)
export const riderNotifications = [
  // DELIVERY MANAGEMENT
  { type: 'delivery', message: 'New delivery assigned: Order #1' },
  { type: 'success', message: 'Pickup confirmed for Order #1' },
  { type: 'success', message: 'Order #1 is delivered successfully' },
  
  // FEEDBACK
  { type: 'info', message: 'Customer feedback received for Order #1' }
]

// Admin notifications (9 total)
export const adminNotifications = [
  // ORDER MANAGEMENT
  { type: 'info', message: 'New order received: Order #1 from Customer 1' },
  { type: 'warning', message: 'Cancellation request for Order #1 from Customer 1' },
  { type: 'warning', message: 'Order #1 was cancelled by Customer 1' },
  
  // MENU MANAGEMENT
  { type: 'success', message: 'Menu updated: Product 1 is added successfully' },
  { type: 'success', message: 'Menu updated: Product 3 has been updated successfully' },
  { type: 'warning', message: 'Menu updated: Product 1 is removed in MENU' },
  
  // PAYMENT
  { type: 'error', message: 'Payment failed for Order #1' },
  
  // REFUND MANAGEMENT
  { type: 'warning', message: 'Refund requested for Order #1' },
  { type: 'success', message: 'Refund approved for Order #1' }
]