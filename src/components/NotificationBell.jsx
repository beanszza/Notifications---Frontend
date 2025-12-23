import React from 'react'

export default function NotificationBell({ unreadCount, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '90px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#3B302A',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.2s',
        zIndex: 9998
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.backgroundColor = '#4A3D35'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.backgroundColor = '#3B302A'
      }}
    >
      {/* Bell Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      
      {/* Badge Count */}
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: '#DC2626',
          color: '#FFFFFF',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          border: '2px solid #FCFDFB'
        }}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  )
}