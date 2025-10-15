import { format, isSameMonth, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { EventCard } from './event-card';
import type { Meeting } from '../types';

type MonthViewProps = {
  currentDate: Date;
  days: Date[];
  getMeetingsForDate: (date: Date) => Meeting[];
  onEventClick: (meeting: Meeting) => void;
};

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function MonthView({
  currentDate,
  days,
  getMeetingsForDate,
  onEventClick,
}: MonthViewProps) {
  return (
    <div className="bg-white rounded-lg border">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center py-3 text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const meetings = getMeetingsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={idx}
              className={cn(
                'min-h-[120px] border-r border-b p-2',
                !isCurrentMonth && 'bg-gray-50',
                idx % 7 === 6 && 'border-r-0'
              )}
            >
              <div
                className={cn(
                  'text-sm font-medium mb-2',
                  !isCurrentMonth && 'text-gray-400',
                  isCurrentDay &&
                    'bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center'
                )}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {meetings.map((meeting) => (
                  <EventCard
                    key={meeting.id}
                    meeting={meeting}
                    onClick={() => onEventClick(meeting)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
