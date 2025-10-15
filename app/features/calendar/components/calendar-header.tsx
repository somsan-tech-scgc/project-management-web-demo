import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ViewToggle } from './view-toggle';
import type { ViewMode } from '../types';

type CalendarHeaderProps = {
  currentDate: Date;
  viewMode: ViewMode;
  onPrevious: () => void;
  onNext: () => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function CalendarHeader({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onViewModeChange,
}: CalendarHeaderProps) {
  const getDateFormat = () => {
    if (viewMode === 'month') {
      return 'MMMM yyyy';
    } else if (viewMode === 'week') {
      return 'MMM dd, yyyy';
    } else {
      return 'MMMM dd, yyyy';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onPrevious} type="button">
          <ChevronLeft className="size-5" />
        </Button>
        <h2 className="text-xl font-semibold min-w-[200px] text-center">
          {format(currentDate, getDateFormat())}
        </h2>
        <Button variant="ghost" size="icon" onClick={onNext} type="button">
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
    </div>
  );
}
