import { Loader2Icon, Workflow, Dot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export type StatusType = "WAIT_UPLOAD" | "UPLOADING" | "COMPLETE" | "FAILED";

export function StatusBadge({ status }: { status: StatusType }) {
  switch (status) {
    case "WAIT_UPLOAD":
      return (
        <Badge variant="outline" className="px-2">
          <Dot className="mr-1 h-4 w-4 animate-ping" />
          Wait Upload...
        </Badge>
      );
    case "UPLOADING":
      return (
        <Badge variant="outline" className="px-2">
          <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
          Now Uploading...
        </Badge>
      );
    case "COMPLETE":
      return (
        <Badge variant="outline" className="px-2">
          <FaCheckCircle className="mr-1 h-4 w-4 fill-green-500" />
          Done
        </Badge>
      );
    case "FAILED":
      return (
        <Badge variant="outline" className="px-2">
          <FaExclamationCircle className="mr-1 h-4 w-4 fill-red-500" />
          Failed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="px-2">
          <Workflow className="mr-1 h-4 w-4 animate-pulse" />
          Preprocessing...
        </Badge>
      );
  }
}