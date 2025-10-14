import { Users, Building2, User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttendeeCardProps {
  name: string;
  role: string;
  type: "committee" | "manager" | "vendor";
}

const icons = {
  committee: Users,
  manager: User,
  vendor: Building2,
};

export function AttendeeCard({ name, role, type }: AttendeeCardProps) {
  const Icon = icons[type];

  return (
    <Card className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{name}</p>
        <p className="text-sm text-muted-foreground truncate">{role}</p>
      </div>
    </Card>
  );
}
