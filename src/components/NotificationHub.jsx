import React, { useState } from 'react'
import { getNotificationColor } from '../utils/helpers'

export default function NotificationHub({ isOpen, onClose, notifications, onClearAll, onMarkAsRead, onDeleteNotification, currentRole }) {
  const [filter, setFilter] = useState('all')

  if (!isOpen) return null

  const unreadNotifications = notifications.filter(n => !n.isRead)
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead)

  const getRoleColor = (role) => {
    const colors = {
      customer: '#3B302A',
      admin: '#2D5F3F',
      rider: '#FF6B35'
    }
    return colors[role] || '#3B302A'
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10001,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Notification Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
        zIndex: 10002,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInFromRight 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E0E0E0',
          backgroundColor: '#FCFDFB'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={getRoleColor(currentRole)} strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <h2 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: "'DM Sans', sans-serif",
                color: '#1C1C1C'
              }}>
                Notifications
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '28px',
                color: '#757575',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: filter === 'all' ? '#3B302A' : '#F5F5F5',
                color: filter === 'all' ? '#F5F5F5' : '#757575',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: filter === 'unread' ? '#3B302A' : '#F5F5F5',
                color: filter === 'unread' ? '#F5F5F5' : '#757575',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Unread ({unreadNotifications.length})
            </button>
          </div>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div style={{
            padding: '12px 24px',
            borderBottom: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={onMarkAsRead}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF6B35',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Mark all read
            </button>
            <button
              onClick={onClearAll}
              style={{
                background: 'none',
                border: 'none',
                color: '#DC2626',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Notification List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0'
        }}>
          {filteredNotifications.length === 0 ? (
            <div style={{
              padding: '60px 24px',
              textAlign: 'center',
              color: '#B3B3B3'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B3B3B3" strokeWidth="1" style={{ margin: '0 auto 16px' }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <p style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#757575'
              }}>
                No notifications yet
              </p>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#B3B3B3'
              }}>
                We'll notify you when something arrives
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <div
                key={notif.id}
                style={{
                  padding: '16px 24px',
                  borderBottom: index < filteredNotifications.length - 1 ? '1px solid #F5F5F5' : 'none',
                  backgroundColor: notif.isRead ? '#FFFFFF' : '#FCFDFB',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  position: 'relative'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = notif.isRead ? '#FFFFFF' : '#FCFDFB'}
              >
                {/* Unread Dot */}
                {!notif.isRead && (
                  <span style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: getNotificationColor(notif.type)
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {/* Color Indicator */}
                  <div style={{
                    width: '4px',
                    height: '40px',
                    backgroundColor: getNotificationColor(notif.type),
                    borderRadius: '2px',
                    flexShrink: 0
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: '14px',
                      fontWeight: notif.isRead ? '400' : '600',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: '#1C1C1C',
                      lineHeight: '1.4'
                    }}>
                      {notif.message}
                    </p>
                    <span style={{
                      fontSize: '12px',
                      color: '#757575',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}>
                      {new Date(notif.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteNotification(notif.id)
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#B3B3B3',
                      cursor: 'pointer',
                      padding: '4px',
                      fontSize: '18px',
                      lineHeight: 1
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInFromRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </>
  )
}