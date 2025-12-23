// Complete Cross-Role Notification Rules Based on Business Requirements
// Implements all notification flows between Customer, Admin, and Rider

export const crossRoleNotifications = {
  
  // ============================================
  // CUSTOMER NOTIFICATIONS
  // ============================================
  customer: {
    // Account Management
    'Your account is successfully created': [],
    
    // Cart/Menu
    'Item successfully added to cart': [],
    
    // Payment & Order Placement
    'Successful payment': [
      {
        role: 'admin',
        type: 'info',
        message: 'New order received: Order #1 from Customer 1'
      }
    ],
    
    'Payment failed': [
      {
        role: 'admin',
        type: 'error',
        message: 'Payment failed for Order #1'
      }
    ],
    
    // Order Status (Customer receives these from other roles)
    'Your order is being prepared': [],
    'Your order is ready for pickup': [],
    'Your order has failed': [],
    'Your order is out for delivery': [],
    'Your order has been delivered': [],
    
    // Cancellation & Refund
    'Your order has been cancelled': [
      {
        role: 'admin',
        type: 'warning',
        message: 'Cancellation request for Order #1 from Customer 1'
      }
    ],
    
    'Your refund has been processed': []
  },

  // ============================================
  // ADMIN NOTIFICATIONS
  // ============================================
  admin: {
    // Order Management
    'New order received: Order #1 from Customer 1': [
      {
        role: 'customer',
        type: 'info',
        message: 'Your order is being prepared'
      }
    ],
    
    // Cancellation Requests
    'Cancellation request for Order #1 from Customer 1': [],
    
    'Order #1 was cancelled by Customer 1': [
      {
        role: 'customer',
        type: 'warning',
        message: 'Your order has been cancelled'
      }
    ],
    
    // Menu Management
    'Menu updated: Product 1 is added successfully': [],
    'Menu updated: Product 3 has been updated successfully': [],
    'Menu updated: Product 1 is removed in MENU': [],
    
    // Payment Issues
    'Payment failed for Order #1': [
      {
        role: 'customer',
        type: 'error',
        message: 'Payment failed'
      }
    ],
    
    // Refund Management
    'Refund requested for Order #1': [],
    
    'Refund approved for Order #1': [
      {
        role: 'customer',
        type: 'success',
        message: 'Your refund has been processed'
      }
    ]
  },

  // ============================================
  // RIDER NOTIFICATIONS
  // ============================================
  rider: {
    // Delivery Assignment
    'New delivery assigned: Order #1': [
      {
        role: 'admin',
        type: 'info',
        message: 'Order #1 assigned to rider'
      },
      {
        role: 'customer',
        type: 'info',
        message: 'Your order is ready for pickup'
      }
    ],
    
    // Pickup Confirmation
    'Pickup confirmed for Order #1': [
      {
        role: 'customer',
        type: 'delivery',
        message: 'Your order is out for delivery'
      },
      {
        role: 'admin',
        type: 'info',
        message: 'Order #1 picked up by rider'
      }
    ],
    
    // Delivery Success
    'Order #1 is delivered successfully': [
      {
        role: 'customer',
        type: 'success',
        message: 'Your order has been delivered'
      },
      {
        role: 'admin',
        type: 'success',
        message: 'Order #1 delivered successfully'
      }
    ],
    
    // Customer Feedback
    'Customer feedback received for Order #1': [
      {
        role: 'admin',
        type: 'info',
        message: 'Customer feedback received for Order #1'
      }
    ]
  }
}