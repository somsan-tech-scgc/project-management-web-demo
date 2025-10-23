import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn, formatDate, formatDateTime } from "@/lib/utils";
import { GATE_STATUS } from "@/constants/common";

export interface TimelineItem {
  id: number;
  projectDetailId?: number;
  name: string;
  status: number | keyof typeof GATE_STATUS;
  updatedAt?: string;
}

interface TimelineProps {
  roadmapItems: TimelineItem[];
  columns?: any[];
}

export function Timeline({ roadmapItems, columns = [] }: TimelineProps) {
  const getStatusIcon = (status: number | keyof typeof GATE_STATUS) => {
    const statusValue = typeof status === 'number' 
      ? GATE_STATUS[status as keyof typeof GATE_STATUS] 
      : GATE_STATUS[status];
      
    if (statusValue === "Completed" || status === 3) {
      return <CheckCircle2 className="h-5 w-5 text-primary" />;
    }
    if (statusValue === "In Progress" || status === 2) {
      return <Clock className="h-5 w-5 text-amber-400" />;
    }
    return <Circle className="h-5 w-5 text-gray-400" />;
  };

  const getStatusText = (status: number | keyof typeof GATE_STATUS) => {
    if (typeof status === 'number') {
      return GATE_STATUS[status as keyof typeof GATE_STATUS] || "Pending";
    }
    return GATE_STATUS[status] || status;
  };

  return (
    <div className="relative">
      {/* Vertical line connecting all items */}
      {roadmapItems.length > 1 ? (
        <div className="absolute left-[10px] top-[20px] bottom-[32px] w-[2px] bg-border" />
      ) : null}
      
      <div className="space-y-6">
        {roadmapItems.map((item, index) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Status icon with background */}
            <div className="relative z-10 flex-shrink-0 bg-background">
              {getStatusIcon(item.status)}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-base mb-1">Gate {index+1}: {item.name}</h4>
                  <p className="text-sm  text-muted-foreground">
                    {getStatusText(item.status)}
                  </p>
                </div>
                
                {item.updatedAt && (
                  <div className="text-xs text-muted-foreground">
                    {formatDateTime(new Date(item.updatedAt))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

