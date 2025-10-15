import type { Notification, NotificationType } from '../types';
import { mockNotifications } from '../mock-data';

/**
 * Notification service - centralized data fetching
 * Replace mockNotifications with API calls when backend is ready
 */
export const notificationService = {
  /**
   * Get all notifications
   * Future: Replace with API call - GET /api/notifications
   */
  getAll: async (): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockNotifications;
  },

  /**
   * Get notifications by type
   * Future: Replace with API call - GET /api/notifications?type=...
   */
  getByType: async (type: NotificationType): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockNotifications.filter((n) => n.type === type);
  },

  /**
   * Mark a single notification as read
   * Future: Replace with API call - PATCH /api/notifications/:id
   */
  markAsRead: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const notification = mockNotifications.find((n) => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
    console.log('Marked as read:', id);
  },

  /**
   * Mark all notifications as read
   * Future: Replace with API call - PATCH /api/notifications/mark-all-read
   */
  markAllAsRead: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    mockNotifications.forEach((n) => {
      n.isRead = true;
    });
    console.log('Marked all as read');
  },

  /**
   * Get unread count
   * Future: Replace with API call - GET /api/notifications/unread-count
   */
  getUnreadCount: async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockNotifications.filter((n) => !n.isRead).length;
  },
};
