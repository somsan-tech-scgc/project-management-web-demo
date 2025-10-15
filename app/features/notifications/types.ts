export type NotificationType = 'invite' | 'reminder' | 'decision' | 'comment' | 'reschedule';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  project: string;
  timestamp: Date;
  isRead: boolean;
};

export type NotificationFilter = NotificationType | 'all';
