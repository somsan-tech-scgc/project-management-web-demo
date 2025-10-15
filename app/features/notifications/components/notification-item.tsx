import { formatDistanceToNow } from 'date-fns';
import { Mail, Bell, CheckCircle, MessageSquare, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Notification, NotificationType } from '../types';

type NotificationItemProps = {
  notification: Notification;
  onClick?: () => void;
};

const iconMap: Record<NotificationType, typeof Mail> = {
  invite: Mail,
  reminder: Bell,
  decision: CheckCircle,
  comment: MessageSquare,
  reschedule: Calendar,
};

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const Icon = iconMap[notification.type];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-4 p-4 rounded-lg border transition-colors text-left',
        notification.isRead
          ? 'bg-white border-gray-200'
          : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
      )}
      type="button"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Icon className="size-5 text-blue-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{notification.title}</p>
        <p className="text-sm text-gray-500 mt-1">Project: {notification.project}</p>
      </div>

      {/* Timestamp */}
      <div className="flex-shrink-0 text-sm text-gray-400">
        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
      </div>
    </button>
  );
}
