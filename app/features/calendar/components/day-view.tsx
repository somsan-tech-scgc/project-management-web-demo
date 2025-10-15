import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Meeting } from '../types';

type DayViewProps = {
  currentDate: Date;
  getMeetingsForDate: (date: Date) => Meeting[];
  onEventClick: (meeting: Meeting) => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function DayView({
  currentDate,
  getMeetingsForDate,
  onEventClick,
}: DayViewProps) {
  const meetings = getMeetingsForDate(currentDate);
  const isCurrentDay = isToday(currentDate);

  const getEventPosition = (meeting: Meeting) => {
    const startHour = meeting.startTime.getHours();
    const startMinute = meeting.startTime.getMinutes();
    const endHour = meeting.endTime.getHours();
    const endMinute = meeting.endTime.getMinutes();

    const top = (startHour + startMinute / 60) * 80; // 80px per hour for more space
    const height = ((endHour + endMinute / 60) - (startHour + startMinute / 60)) * 80;

    return { top, height };
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header */}
      <div className="border-b bg-gray-50 p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'text-4xl font-bold',
              isCurrentDay && 'text-blue-500'
            )}
          >
            {format(currentDate, 'd')}
          </div>
          <div>
            <div className="text-sm text-gray-500">
              {format(currentDate, 'EEEE')}
            </div>
            <div className="text-sm font-medium">
              {format(currentDate, 'MMMM yyyy')}
            </div>
          </div>
        </div>
      </div>

      {/* Time grid */}
      <div className="overflow-auto max-h-[600px]">
        <div className="grid grid-cols-[80px_1fr] relative">
          {/* Hours column */}
          <div className="border-r bg-gray-50">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-[80px] border-b text-sm text-gray-600 pr-3 pt-2 text-right font-medium"
              >
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Day column with events */}
          <div className="relative">
            {/* Hour slots */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-[80px] border-b border-gray-100"
              />
            ))}

            {/* Events overlay */}
            <div className="absolute inset-0 pointer-events-none px-2">
              {meetings.map((meeting) => {
                const { top, height } = getEventPosition(meeting);
                return (
                  <button
                    key={meeting.id}
                    onClick={() => onEventClick(meeting)}
                    className={cn(
                      'absolute left-2 right-2 rounded-lg px-3 py-2 text-sm font-medium text-white pointer-events-auto shadow-md',
                      meeting.color,
                      'hover:opacity-90 transition-all hover:shadow-lg'
                    )}
                    style={{
                      top: `${top}px`,
                      height: `${Math.max(height, 40)}px`,
                    }}
                    type="button"
                  >
                    <div className="font-semibold">{meeting.title}</div>
                    <div className="text-xs opacity-90 mt-1">
                      {format(meeting.startTime, 'h:mm a')} - {format(meeting.endTime, 'h:mm a')}
                    </div>
                    <div className="text-xs opacity-75 mt-1 truncate">
                      {meeting.project}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current time indicator */}
            {isCurrentDay && (
              <div
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 80}px`,
                }}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                  <div className="flex-1 h-0.5 bg-red-500" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
