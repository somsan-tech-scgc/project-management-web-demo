import type { Meeting } from './types';

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Urgent: Gate 1 Review',
    project: 'Project Alpha',
    gate: 'Gate 1 Review',
    startTime: new Date(2025, 9, 3, 10, 0),
    endTime: new Date(2025, 9, 3, 11, 30),
    location: 'https://meet.example.com/urgent-gate1',
    color: 'bg-red-500',
    attendees: [
      {
        id: 'a1',
        name: 'Review Committee A',
        role: 'Committee',
      },
      {
        id: 'a2',
        name: 'Ethan Carter',
        role: 'Project Manager',
      },
    ],
  },
  {
    id: '2',
    title: 'Project Phoenix Kick-off',
    project: 'Project Phoenix',
    gate: 'Kick-off Meeting',
    startTime: new Date(2025, 9, 10, 9, 0),
    endTime: new Date(2025, 9, 10, 10, 30),
    location: 'Conference Room B',
    color: 'bg-green-500',
    attendees: [
      {
        id: 'a3',
        name: 'Sarah Johnson',
        role: 'Project Manager',
      },
      {
        id: 'a4',
        name: 'Vendor X',
        role: 'Vendor',
      },
    ],
  },
  {
    id: '3',
    title: 'Project Nebula Sync',
    project: 'Project Nebula',
    gate: 'Gate 2 Review',
    startTime: new Date(2025, 9, 17, 14, 0),
    endTime: new Date(2025, 9, 17, 15, 30),
    location: 'https://meet.example.com/nebula-sync',
    color: 'bg-blue-500',
    attendees: [
      {
        id: 'a5',
        name: 'Review Committee B',
        role: 'Committee',
      },
    ],
  },
  {
    id: '4',
    title: 'Project Orion Planning',
    project: 'Project Orion',
    gate: 'Planning Session',
    startTime: new Date(2025, 9, 17, 16, 0),
    endTime: new Date(2025, 9, 17, 17, 0),
    location: 'Conference Room A',
    color: 'bg-purple-500',
    attendees: [
      {
        id: 'a6',
        name: 'Mike Williams',
        role: 'Project Manager',
      },
      {
        id: 'a7',
        name: 'Vendor Y',
        role: 'Vendor',
      },
    ],
  },
];
