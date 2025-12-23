import React from 'react'
import { riderNotifications } from '../data/notifications'

export default function RiderPage({ onNotificationClick }) {
  return (
    <div className="page-container">
      <h2 className="page-title">Rider Notifications</h2>
      <p className="page-subtitle">
        4 notification types • Delivery Assignments, Pickups, Deliveries, Feedback
      </p>

      <div className="button-grid">
        {riderNotifications.map((notif, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              onNotificationClick(notif.type, notif.message)
            }}
            className="demo-btn btn-rider"
            type="button"
          >
            {notif.message}
          </button>
        ))}
      </div>
    </div>
  )
}