import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table"
import { Loader2Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"

const datasetlist = [
  {
    status: "uploading",
    filename: "1.mp4",
    folder: "hogehoge",
  },
  {
    status: "failed",
    filename: "2.mp4",
    folder: "piyopiyo",
  },
  {
    status: "preprocessing",
    filename: "3.mp4",
    folder: "hogehoge",
  },
  {
    status: "uploading",
    filename: "4.mp4",
    folder: "hogehoge",
  },
  {
    status: "done",
    filename: "fuga.mp4",
    folder: "fugafuga",
  },
  {
    status: "failed",
    filename: "piyo.mp4",
    folder: "piyopiyo",
  },
] as const

// ステータスに応じたBadgeを返すヘルパー
function StatusBadge({ status }: { status: typeof datasetlist[number]["status"] }) {
  switch (status) {
    case "uploading":
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
          Now Uploading...
        </Badge>
      )
    case "preprocessing":
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
          Now Preprocessing...
        </Badge>
      )
    case "done":
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          <FaCheckCircle className="mr-1 h-4 w-4 fill-green-500 dark:fill-green-400" />
          Done
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          <FaExclamationCircle className="mr-1 h-4 w-4 fill-red-500 dark:fill-red-400" />
          Failed
        </Badge>
      )
    default:
      return <span>{status}</span>
  }
}

export function TableDemo() {
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
          {datasetlist.map((data) => (
            <TableRow key={data.filename} className="hover:bg-muted/10">
              <TableCell>
                <StatusBadge status={data.status} />
              </TableCell>
              <TableCell >{data.filename}</TableCell>
              <TableCell>{data.folder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
