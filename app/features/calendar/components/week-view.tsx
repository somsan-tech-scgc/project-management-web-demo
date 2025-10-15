import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Meeting } from '../types';

type WeekViewProps = {
  currentDate: Date;
  getMeetingsForDate: (date: Date) => Meeting[];
  onEventClick: (meeting: Meeting) => void;
};

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeekView({
  currentDate,
  getMeetingsForDate,
  onEventClick,
}: WeekViewProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventPosition = (meeting: Meeting) => {
    const startHour = meeting.startTime.getHours();
    const startMinute = meeting.startTime.getMinutes();
    const endHour = meeting.endTime.getHours();
    const endMinute = meeting.endTime.getMinutes();

    const top = (startHour + startMinute / 60) * 60; // 60px per hour
    const height = ((endHour + endMinute / 60) - (startHour + startMinute / 60)) * 60;

    return { top, height };
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header with days */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b bg-gray-50 sticky top-0 z-10">
        <div className="border-r" /> {/* Time column header */}
        {weekDays.map((day, idx) => {
          const isCurrentDay = isToday(day);
          return (
            <div
              key={idx}
              className="text-center py-3 border-r last:border-r-0"
            >
              <div className="text-xs text-gray-500 font-medium">
                {WEEKDAYS_SHORT[idx]}
              </div>
              <div
                className={cn(
                  'text-xl font-semibold mt-1',
                  isCurrentDay && 'text-blue-500'
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="overflow-auto max-h-[600px]">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] relative">
          {/* Hours column */}
          <div className="border-r">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b text-xs text-gray-500 pr-2 pt-1 text-right"
              >
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Day columns with events */}
          {weekDays.map((day, dayIdx) => {
            const dayMeetings = getMeetingsForDate(day);
            return (
              <div key={dayIdx} className="relative border-r last:border-r-0">
                {/* Hour slots */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b border-gray-100"
                  />
                ))}

                {/* Events overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {dayMeetings.map((meeting) => {
                    const { top, height } = getEventPosition(meeting);
                    return (
                      <button
                        key={meeting.id}
                        onClick={() => onEventClick(meeting)}
                        className={cn(
                          'absolute left-1 right-1 rounded px-2 py-1 text-xs font-medium text-white pointer-events-auto overflow-hidden',
                          meeting.color,
                          'hover:opacity-80 transition-opacity'
                        )}
                        style={{
                          top: `${top}px`,
                          height: `${Math.max(height, 30)}px`,
                        }}
                        type="button"
                      >
                        <div className="font-semibold truncate">{meeting.title}</div>
                        <div className="text-[10px] opacity-90">
                          {format(meeting.startTime, 'h:mm a')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
