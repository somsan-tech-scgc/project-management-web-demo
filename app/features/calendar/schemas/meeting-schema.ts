import { z } from 'zod';

export const meetingSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title is too long'),
  project: z.string().min(1, 'Project is required'),
  gate: z.string().min(1, 'Gate is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  location: z.string().optional(),
  attendeeIds: z.array(z.string()).min(1, 'At least one attendee is required'),
}).refine(
  (data) => {
    if (data.startTime && data.endTime) {
      return new Date(data.endTime) > new Date(data.startTime);
    }
    return true;
  },
  {
    message: 'End time must be after start time',
    path: ['endTime'],
  }
);

export type MeetingFormValues = z.infer<typeof meetingSchema>;
