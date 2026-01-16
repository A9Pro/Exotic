// src/context/NotificationContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../components/ToastContainer';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('exotic_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
      } catch (e) {
        console.error('Failed to parse notifications:', e);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('exotic_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      read: false,
      time: 'Just now',
      timestamp: Date.now(),
      ...notification,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for important notifications
    if (notification.showToast !== false) {
      const toastType = notification.type === 'order' ? 'success' : 'info';
      toast[toastType](notification.title);
    }

    // Play notification sound (optional)
    playNotificationSound();

    return newNotification;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Remove single notification
  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Update relative timestamps
  useEffect(() => {
    const updateTimes = () => {
      setNotifications(prev =>
        prev.map(n => ({
          ...n,
          time: getRelativeTime(n.timestamp),
        }))
      );
    };

    // Update every minute
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    // You can add a notification sound here
    // const audio = new Audio('/notification.mp3');
    // audio.play().catch(e => console.log('Could not play sound:', e));
  };

  const value = {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Helper function to get relative time
function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  return new Date(timestamp).toLocaleDateString();
}