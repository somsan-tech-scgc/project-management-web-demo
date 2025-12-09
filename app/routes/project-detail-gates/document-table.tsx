import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { useProjectDetail } from "@/hooks/use-project-detail";

interface Document {
  name: string;
  version: string;
  status: "Approved" | "Pending" | "Rejected";
}



export const DocumentTable = () => {
  const projectDetailQuery = useProjectDetail(1);
  const projectDetail = projectDetailQuery.data;
  const initialDocuments = projectDetail?.documents ?? [];
  const [documents, setDocuments] = useState<Document[]>(
    initialDocuments.map((doc) => ({
      name: doc.name,
      version: "1.0",
      status: ["Pending", "Approved", "Rejected"][
        Math.floor(Math.random() * 3)
      ],
    }))
  );

  const handleStatusChange = (index: number, newStatus: Document["status"]) => {
    const newDocuments = [...documents];
    newDocuments[index].status = newStatus;
    setDocuments(newDocuments);
  };

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
                  <Select
                    value={doc.status}
                    onValueChange={(value) =>
                      handleStatusChange(index, value as Document["status"])
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-4 px-4">
                  <Link
                    to={`https://www.rd.go.th/fileadmin/user_upload/kormor/newlaw/moftopuptax1A.pdf`}
                    target="_blank"
                  >
                    <Button variant="link" className="h-auto p-0 text-primary">
                      View
                    </Button>
                  </Link>
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
