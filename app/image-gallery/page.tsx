import { Loader2Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 lg:px-6 mb-4">
      <Badge variant="outline" className="text-muted-foreground px-2 mb-1">
        <Loader2Icon className="animate-spin" />
        Now Uploading...
      </Badge>
    </div>
  )
}
