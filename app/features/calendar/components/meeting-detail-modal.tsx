import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import type { Meeting } from '../types';

type MeetingDetailModalProps = {
  meeting: Meeting | null;
  open: boolean;
  onClose: () => void;
};

export function MeetingDetailModal({
  meeting,
  open,
  onClose,
}: MeetingDetailModalProps) {
  if (!meeting) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{meeting.title}</DialogTitle>
          <div className="text-sm text-gray-500">
            {meeting.project} / {meeting.gate}
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
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
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="size-5" />
                <h3 className="font-semibold">
                  Attendees ({meeting.attendees.length})
                </h3>
              </div>
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

          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1">
              Edit Meeting
            </Button>
            <Button variant="destructive" className="flex-1">
              Cancel Meeting
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
