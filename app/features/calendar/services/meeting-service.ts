import type { Meeting } from '../types';
import { mockMeetings } from '../mock-data';

/**
 * Meeting service - centralized data fetching
 * Replace mockMeetings with API calls when backend is ready
 */
export const meetingService = {
  /**
   * Get all meetings
   * Future: Replace with API call - GET /api/meetings
   */
  getAllMeetings: async (): Promise<Meeting[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockMeetings;
  },

  /**
   * Get meetings within a date range
   * Future: Replace with API call - GET /api/meetings?start=...&end=...
   */
  getMeetingsInRange: async (startDate: Date, endDate: Date): Promise<Meeting[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockMeetings.filter(
      (meeting) =>
        meeting.startTime >= startDate && meeting.startTime <= endDate
    );
  },

  /**
   * Get a single meeting by ID
   * Future: Replace with API call - GET /api/meetings/:id
   */
  getMeetingById: async (id: string): Promise<Meeting | null> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockMeetings.find((m) => m.id === id) || null;
  },

  /**
   * Create a new meeting
   * Future: Replace with API call - POST /api/meetings
   */
  createMeeting: async (meetingData: Omit<Meeting, 'id'>): Promise<Meeting> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const newMeeting: Meeting = {
      ...meetingData,
      id: `meeting-${Date.now()}`,
    };
    // In real implementation, this would be saved to backend
    console.log('Creating meeting:', newMeeting);
    return newMeeting;
  },

  /**
   * Update an existing meeting
   * Future: Replace with API call - PUT /api/meetings/:id
   */
  updateMeeting: async (id: string, meetingData: Partial<Meeting>): Promise<Meeting | null> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const meeting = mockMeetings.find((m) => m.id === id);
    if (!meeting) return null;
    
    const updatedMeeting = { ...meeting, ...meetingData };
    console.log('Updating meeting:', updatedMeeting);
    return updatedMeeting;
  },

  /**
   * Delete a meeting
   * Future: Replace with API call - DELETE /api/meetings/:id
   */
  deleteMeeting: async (id: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const exists = mockMeetings.some((m) => m.id === id);
    console.log('Deleting meeting:', id);
    return exists;
  },
};
