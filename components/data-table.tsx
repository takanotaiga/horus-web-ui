// components/data-table.tsx
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Loader2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export type StatusType = "uploading" | "preprocessing" | "done" | "failed";

export interface FileRecord {
  filename: string;
  folder: string;
  status: StatusType;
}

interface TableDemoProps {
  files: FileRecord[];
}

function StatusBadge({ status }: { status: StatusType }) {
  switch (status) {
    case "uploading":
      return (
        <Badge variant="outline" className="px-2">
          <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
          Now Uploading...
        </Badge>
      );
    case "preprocessing":
      return (
        <Badge variant="outline" className="px-2">
          <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
          Preprocessing...
        </Badge>
      );
    case "done":
      return (
        <Badge variant="outline" className="px-2">
          <FaCheckCircle className="mr-1 h-4 w-4 fill-green-500" />
          Done
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="px-2">
          <FaExclamationCircle className="mr-1 h-4 w-4 fill-red-500" />
          Failed
        </Badge>
      );
    default:
      return <span>{status}</span>;
  }
}

export function TableDemo({ files }: TableDemoProps) {
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
            <TableRow key={data.filename} className="hover:bg-muted/10">
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
