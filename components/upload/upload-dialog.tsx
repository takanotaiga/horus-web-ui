"use client"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { FolderSelector } from "@/components/upload/folder-selector"
import { FolderPlus, Search, CloudUpload } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
  onUpload: (files: File[], folder: string) => void
}

export default function UploadDialog({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [folderList, setfolderList] = useState<string[]>([]);

  const BACKEND_URL = "http://dpc2500015.local:65304";

  const PREVIEW_COUNT = 3
  const previewFiles = selectedFiles.slice(0, PREVIEW_COUNT)
  const remaining = selectedFiles.length - PREVIEW_COUNT

  useEffect(() => {
    reloadFolderList();
  }, []);

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const arr = Array.from(files)
    setSelectedFiles(arr)
    setDialogOpen(true)
  }

  const handleCreateOrCancel = () => {
    if (isCreateMode) {
      console.log("新しいフォルダを作成:", newFolderName)
      setNewFolderName("")
    }
    setIsCreateMode(!isCreateMode)
    reloadFolderList()
  }

  const handleClickUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles, newFolderName)
      setDialogOpen(false)
    }
  }

  const reloadFolderList = async () => {
    const initRes = await fetch(`${BACKEND_URL}/storage/folder_list`);
    const {files} = await initRes.json()
    setfolderList([]);
    for(const file of files){
      if(file != ""){
        setfolderList(prev => [...prev, file]);
      }
    }
  };

  const onset = (input: string) => {
    setNewFolderName(input)
  };

  return (
    <div className="flex flex-col items-center">
      <Button variant="outline" onClick={onButtonClick}>
        <CloudUpload />
        <span>Upload file</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={onFileChange}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload to cloud</DialogTitle>
          </DialogHeader>

          <DialogDescription>選択されたファイル:</DialogDescription>
          <ul className="mt-2 space-y-1 text-sm list-inside list-disc">
            {previewFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
          {remaining > 0 && (
            <div className="mt-1 text-sm">その他 {remaining} 件</div>
          )}

          <div className="mt-4 flex items-center gap-2 w-full">
            <div className="flex-1">
              {isCreateMode ? (
                <Input
                  placeholder="新しいフォルダ名を入力"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full"
                />
              ) : (
                <FolderSelector folders={folderList} onSet={onset} />
              )}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleCreateOrCancel}
                >
                  {isCreateMode ? <Search /> : <FolderPlus />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isCreateMode ? "既存のフォルダを検索" : "フォルダ作成"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <DialogFooter className="sm:justify-start mt-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClickUpload}
                disabled={selectedFiles.length === 0}
              >
                <CloudUpload className="mr-1" />
                Upload ({selectedFiles.length})
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
