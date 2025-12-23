import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { getNotificationColor, getTimeAgo } from '../utils/helpers'

export default function ToastNotification({ notifications, onClose }) {
  return (
    <ToastContainer 
      position="top-end" 
      className="p-3" 
      style={{ 
        zIndex: 9999,
        position: 'fixed',
        top: '20px',
        right: '20px'
      }}
    >
      {notifications.map(notif => (
        <Toast
          key={notif.id}
          onClose={() => onClose(notif.id)}
          autohide={false}
          style={{
            minWidth: '320px',
            maxWidth: '380px',
            backgroundColor: '#FFFFFF',
            borderLeft: `6px solid ${getNotificationColor(notif.type)}`,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            animation: 'slideIn 0.3s ease-out',
            marginBottom: '8px'
          }}
        >
          <Toast.Body style={{ 
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Message - Plus Jakarta Sans Regular */}
            <div style={{ 
              color: '#1C1C1C',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '1.3',
              flex: 1,
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              {notif.message}
            </div>
            {/* Time - Secondary Text */}
            <div style={{ 
              fontSize: '12px',
              color: '#757575',
              whiteSpace: 'nowrap',
              fontWeight: '400',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              {getTimeAgo(notif.createdAt)}
            </div>
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}