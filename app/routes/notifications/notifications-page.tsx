'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NotificationItem } from '@/features/notifications/components/notification-item';
import { notificationService } from '@/features/notifications/services/notification-service';
import type { Notification, NotificationFilter } from '@/features/notifications/types';

const TABS: { value: NotificationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'invite', label: 'Invites' },
  { value: 'reminder', label: 'Reminders' },
  { value: 'decision', label: 'Decisions' },
  { value: 'comment', label: 'Comments' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NotificationFilter>('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification.id);
        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
    // Optional: Navigate to related item or show details
  };

  const getFilteredNotifications = (filter: NotificationFilter) => {
    if (filter === 'all') return notifications;
    return notifications.filter((n) => n.type === filter);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-gray-600">
          Stay up-to-date with all project review activities.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as NotificationFilter)}>
        <TabsList className="mb-6">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {/* Loading state */}
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading notifications...
              </div>
            ) : (
              <>
                {/* Notification list */}
                <div className="space-y-3 mb-6">
                  {getFilteredNotifications(tab.value).length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No notifications in this category.
                    </div>
                  ) : (
                    getFilteredNotifications(tab.value).map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={() => handleNotificationClick(notification)}
                      />
                    ))
                  )}
                </div>

                {/* Mark all as read button */}
                {getFilteredNotifications(tab.value).length > 0 && (
                  <div className="flex justify-end">
                    <Button
                      onClick={handleMarkAllAsRead}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Mark All as Read
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
