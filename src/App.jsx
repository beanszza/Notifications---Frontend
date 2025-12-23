import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ToastNotification from './components/ToastNotification'
import NotificationBell from './components/NotificationBell'
import NotificationHub from './components/NotificationHub'
import CustomerPage from './pages/CustomerPage'
import AdminPage from './pages/AdminPage'
import RiderPage from './pages/RiderPage'
import { crossRoleNotifications } from './utils/notificationRules'

export default function App() {
  const [toastNotifications, setToastNotifications] = useState([])
  
  const [customerNotifications, setCustomerNotifications] = useState([])
  const [adminNotifications, setAdminNotifications] = useState([])
  const [riderNotifications, setRiderNotifications] = useState([])
  
  const [currentPage, setCurrentPage] = useState('customer')
  const [isHubOpen, setIsHubOpen] = useState(false)

  const addToastNotification = (type, message, role) => {
    const id = Date.now() + Math.random()
    const createdAt = new Date()
    const newNotif = { id, type, message, createdAt, isRead: false, role }
    
    // Only show toast if it's for the CURRENT page/role
    if (role === currentPage) {
      setToastNotifications(prev => [...prev, newNotif])
      
      // Auto-remove from toast after 5 seconds
      setTimeout(() => {
        removeToastNotification(id)
      }, 5000)
    }
    
    // Always add to notification history (regardless of current page)
    if (role === 'customer') {
      setCustomerNotifications(prev => [newNotif, ...prev])
    } else if (role === 'admin') {
      setAdminNotifications(prev => [newNotif, ...prev])
    } else if (role === 'rider') {
      setRiderNotifications(prev => [newNotif, ...prev])
    }
    
    // Trigger cross-role notifications
    triggerCrossRoleNotifications(message, role)
  }

  const triggerCrossRoleNotifications = (originalMessage, triggeringRole) => {
    const rules = crossRoleNotifications[triggeringRole]
    
    if (!rules || !rules[originalMessage]) return
    
    const relatedNotifications = rules[originalMessage]
    
    relatedNotifications.forEach((notif) => {
      setTimeout(() => {
        const id = Date.now() + Math.random()
        const createdAt = new Date()
        const crossNotif = { 
          id, 
          type: notif.type, 
          message: notif.message, 
          createdAt, 
          isRead: false, 
          role: notif.role 
        }
        
        // Only show toast if target role is CURRENTLY ACTIVE
        if (notif.role === currentPage) {
          setToastNotifications(prev => [...prev, crossNotif])
          
          setTimeout(() => {
            removeToastNotification(crossNotif.id)
          }, 5000)
        }
        
        // Always add to target role's history
        if (notif.role === 'customer') {
          setCustomerNotifications(prev => [crossNotif, ...prev])
        } else if (notif.role === 'admin') {
          setAdminNotifications(prev => [crossNotif, ...prev])
        } else if (notif.role === 'rider') {
          setRiderNotifications(prev => [crossNotif, ...prev])
        }
      }, 500)
    })
  }

  const removeToastNotification = (id) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getCurrentRoleNotifications = () => {
    if (currentPage === 'customer') return customerNotifications
    if (currentPage === 'admin') return adminNotifications
    if (currentPage === 'rider') return riderNotifications
    return []
  }

  const markAllAsRead = () => {
    if (currentPage === 'customer') {
      setCustomerNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    } else if (currentPage === 'admin') {
      setAdminNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    } else if (currentPage === 'rider') {
      setRiderNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    }
  }

  const clearAllNotifications = () => {
    if (currentPage === 'customer') {
      setCustomerNotifications([])
    } else if (currentPage === 'admin') {
      setAdminNotifications([])
    } else if (currentPage === 'rider') {
      setRiderNotifications([])
    }
  }

  const deleteNotification = (id) => {
    if (currentPage === 'customer') {
      setCustomerNotifications(prev => prev.filter(n => n.id !== id))
    } else if (currentPage === 'admin') {
      setAdminNotifications(prev => prev.filter(n => n.id !== id))
    } else if (currentPage === 'rider') {
      setRiderNotifications(prev => prev.filter(n => n.id !== id))
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setToastNotifications(prev => [...prev])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const currentRoleNotifications = getCurrentRoleNotifications()
  const unreadCount = currentRoleNotifications.filter(n => !n.isRead).length

  return (
    <Container fluid className="app-container">
      <div className="text-center mb-5">
        <h1 className="main-title">🦫 Kapebara Notification System</h1>
        <p className="subtitle">Role-based notification interface with cross-role updates</p>
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${currentPage === 'customer' ? 'active' : ''}`}
          onClick={() => setCurrentPage('customer')}
        >
          👤 Customer {customerNotifications.filter(n => !n.isRead).length > 0 && 
            <span style={{ 
              marginLeft: '8px', 
              backgroundColor: '#DC2626', 
              color: '#fff', 
              borderRadius: '10px', 
              padding: '2px 8px', 
              fontSize: '12px' 
            }}>
              {customerNotifications.filter(n => !n.isRead).length}
            </span>
          }
        </button>
        <button
          className={`nav-tab ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentPage('admin')}
        >
          👨‍💼 Admin {adminNotifications.filter(n => !n.isRead).length > 0 && 
            <span style={{ 
              marginLeft: '8px', 
              backgroundColor: '#DC2626', 
              color: '#fff', 
              borderRadius: '10px', 
              padding: '2px 8px', 
              fontSize: '12px' 
            }}>
              {adminNotifications.filter(n => !n.isRead).length}
            </span>
          }
        </button>
        <button
          className={`nav-tab ${currentPage === 'rider' ? 'active' : ''}`}
          onClick={() => setCurrentPage('rider')}
        >
          🚴 Rider {riderNotifications.filter(n => !n.isRead).length > 0 && 
            <span style={{ 
              marginLeft: '8px', 
              backgroundColor: '#DC2626', 
              color: '#fff', 
              borderRadius: '10px', 
              padding: '2px 8px', 
              fontSize: '12px' 
            }}>
              {riderNotifications.filter(n => !n.isRead).length}
            </span>
          }
        </button>
      </div>

      {currentPage === 'customer' && (
        <CustomerPage 
          onNotificationClick={(type, message) => addToastNotification(type, message, 'customer')} 
        />
      )}
      {currentPage === 'admin' && (
        <AdminPage 
          onNotificationClick={(type, message) => addToastNotification(type, message, 'admin')} 
        />
      )}
      {currentPage === 'rider' && (
        <RiderPage 
          onNotificationClick={(type, message) => addToastNotification(type, message, 'rider')} 
        />
      )}

      <ToastNotification
        notifications={toastNotifications}
        onClose={removeToastNotification}
      />

      <NotificationBell
        unreadCount={unreadCount}
        onClick={() => setIsHubOpen(true)}
      />

      <NotificationHub
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        notifications={currentRoleNotifications}
        onClearAll={clearAllNotifications}
        onMarkAsRead={markAllAsRead}
        onDeleteNotification={deleteNotification}
        currentRole={currentPage}
      />
    </Container>
  )
}