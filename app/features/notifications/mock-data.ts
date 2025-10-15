import type { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'invite',
    title: "You've been invited to review Gate 1 documents.",
    project: 'Alpha Launch',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: false,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Reminder: Gate 2 review deadline approaching.',
    project: 'Beta Expansion',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: false,
  },
  {
    id: '3',
    type: 'decision',
    title: 'Gate 3 review decision: Approved with minor revisions.',
    project: 'Gamma Integration',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    isRead: false,
  },
  {
    id: '4',
    type: 'comment',
    title: "New comment on Gate 1 document: 'Please clarify section 3.2'.",
    project: 'Delta Migration',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: false,
  },
  {
    id: '5',
    type: 'reschedule',
    title: 'Gate 4 review rescheduled to next Tuesday.',
    project: 'Epsilon Upgrade',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    isRead: false,
  },
];
