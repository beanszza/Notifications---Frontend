import React from 'react'
import { customerNotifications } from '../data/notifications'

export default function CustomerPage({ onNotificationClick }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Customer Notifications</h2>
      <p className="page-subtitle">
        11 notification types • Account, Cart, Orders, Payments, Delivery
      </p>

      <div className="button-grid">
        {customerNotifications.map((notif, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              onNotificationClick(notif.type, notif.message)
            }}
            className="demo-btn btn-customer"
            type="button"
          >
            {notif.message}
          </button>
        ))}
      </div>
    </div>
  )
}