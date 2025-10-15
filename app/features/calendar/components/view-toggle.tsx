import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ViewMode } from '../types';

type ViewToggleProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  const modes: { value: ViewMode; label: string }[] = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  return (
    <div className="flex gap-2">
      {modes.map((mode) => (
        <Button
          key={mode.value}
          variant={viewMode === mode.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange(mode.value)}
          className={cn(
            'min-w-[70px]',
            viewMode === mode.value && 'bg-blue-500 hover:bg-blue-600'
          )}
          type="button"
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
}
