import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Document {
  name: string;
  version: string;
  status: "Approved" | "Pending";
}

const documents: Document[] = [
  { name: "Project Proposal", version: "1.2", status: "Approved" },
  { name: "Technical Specifications", version: "2.0", status: "Pending" },
  { name: "Risk Assessment Report", version: "1.0", status: "Approved" },
];

export const DocumentTable = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Document List
      </h2>
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Document Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Version
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="py-4 px-4 text-sm text-foreground">
                  {doc.name}
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">
                  {doc.version}
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant={doc.status === "Approved" ? "success" : "warning"}
                  >
                    {doc.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Button variant="link" className="h-auto p-0 text-primary">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
