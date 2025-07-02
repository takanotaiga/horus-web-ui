import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { StatusBadge, StatusType} from "@/components/upload/status-badge"
import { UUID } from "crypto";

export interface FileRecord {
    id: UUID;
    filename: string;
    folder: string;
    status: StatusType;
}

interface UploadStatusTableProps {
  files: FileRecord[];
}

export function UploadStatusTable({ files }: UploadStatusTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border w-full">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Saved Folder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {files.map((data) => (
            <TableRow key={data.id} className="hover:bg-muted/10">
              <TableCell>
                <StatusBadge status={data.status} />
              </TableCell>
              <TableCell>{data.filename}</TableCell>
              <TableCell>{data.folder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
