'use client';

import { useParams, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMeetings } from '@/features/calendar/mock-data';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';

export default function MeetingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const meeting = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Meeting Not Found</h1>
          <Button onClick={() => navigate('/calendar')}>Back to Calendar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/calendar')}
        className="mb-6"
      >
        <ArrowLeft className="size-4 mr-2" />
        Back to Calendar
      </Button>

      {/* Meeting header */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          {meeting.project} / {meeting.gate}
        </div>
        <h1 className="text-3xl font-bold mb-2">{meeting.title}</h1>
      </div>

      {/* Meeting details */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Date</div>
                <div className="text-gray-600">
                  {format(meeting.startTime, 'EEEE, MMMM dd, yyyy')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Time</div>
                <div className="text-gray-600">
                  {format(meeting.startTime, 'h:mm a')} -{' '}
                  {format(meeting.endTime, 'h:mm a')}
                </div>
              </div>
            </div>

            {meeting.location && (
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-gray-600">
                    {meeting.location.startsWith('http') ? (
                      <a
                        href={meeting.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {meeting.location}
                      </a>
                    ) : (
                      meeting.location
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Attendees ({meeting.attendees.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {meeting.attendees.map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                    <Users className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{attendee.name}</div>
                    <div className="text-sm text-gray-500">{attendee.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Edit Meeting
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancel Meeting
          </Button>
        </div>
      </div>
    </div>
  );
}
