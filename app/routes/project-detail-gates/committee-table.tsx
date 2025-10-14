import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type CommitteeTableProps = {
  members: any[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function CommitteeTable({
  members,
  selectedIds,
  onToggle,
}: CommitteeTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Available Committee Members
      </h2>
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground w-12"></th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Role
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Department
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-b border-border last:border-0"
              >
                <td className="py-4 px-4">
                  <Checkbox
                    checked={selectedIds.includes(member.id)}
                    onCheckedChange={() => onToggle(member.id)}
                  />
                </td>
                <td className="py-4 px-4 text-sm text-foreground font-medium">
                  {member.name}
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">
                  {member.role}
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">
                  {member.department}
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant={
                      member.availability === "Available"
                        ? "success"
                        : member.availability === "Busy"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {member.availability}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommitteeTable;
