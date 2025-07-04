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
    create_time: string;
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
            <TableHead>Create Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>File Name</TableHead>
            <TableHead>Saved Folder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {files.map((data) => (
            <TableRow key={data.id} className="hover:bg-muted/10">
              <TableCell>
                {new Date(data.create_time)
                  .toLocaleString("ja-JP", {
                    timeZone: "Asia/Tokyo",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
              </TableCell>
              <TableCell>
                <StatusBadge status={data.status} />
              </TableCell>
              {/* <TableCell>{data.status}</TableCell> */}
              <TableCell>{data.filename}</TableCell>
              <TableCell>{data.folder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
