import { Loader2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export type StatusType = "uploading" | "preprocessing" | "done" | "failed";

export function StatusBadge({ status }: { status: StatusType }) {
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