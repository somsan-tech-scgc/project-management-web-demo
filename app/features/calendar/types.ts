export type ViewMode = 'month' | 'week' | 'day';

export type AttendeeRole = 'Committee' | 'Project Manager' | 'Vendor';

export type Attendee = {
  id: string;
  name: string;
  role: AttendeeRole;
  avatar?: string;
};

export type Meeting = {
  id: string;
  title: string;
  project: string;
  gate: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: Attendee[];
  color: string;
};

export type CalendarState = {
  currentDate: Date;
  viewMode: ViewMode;
  selectedMeeting: Meeting | null;
};
