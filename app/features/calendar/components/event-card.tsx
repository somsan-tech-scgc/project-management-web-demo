import { cn } from '@/lib/utils';
import type { Meeting } from '../types';

type EventCardProps = {
  meeting: Meeting;
  onClick?: () => void;
  className?: string;
};

export function EventCard({ meeting, onClick, className }: EventCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-2 py-1 rounded text-xs font-medium text-white truncate hover:opacity-80 transition-opacity',
        meeting.color,
        className
      )}
      type="button"
    >
      {meeting.title}
    </button>
  );
}
