import React from 'react'
import { adminNotifications } from '../data/notifications'

export default function AdminPage({ onNotificationClick }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Admin Notifications</h2>
      <p className="page-subtitle">
        9 notification types • Orders, Menu Management, Payments, Refunds
      </p>

      <div className="button-grid">
        {adminNotifications.map((notif, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              onNotificationClick(notif.type, notif.message)
            }}
            className="demo-btn btn-admin"
            type="button"
          >
            {notif.message}
          </button>
        ))}
      </div>
    </div>
  )
}