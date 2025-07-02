"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import UploadDialog from "@/components/upload/upload-dialog";
import { PaginationWithTable } from "@/components/upload/pagination-with-table";
import { UploadStatusTable, FileRecord } from "@/components/upload/upload-status-table";

export default function Home() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const CHUNK_SIZE = 50 * 1024 * 1024;
  const BACKEND_URL = "http://dpc2500015.local:65304";

  const handleUpload = async (selectedFiles: File[], folder: string) => {
    for (const file of selectedFiles) {
      const id = uuidv4() as unknown as FileRecord["id"];
      const newFile: FileRecord = {
        id,
        filename: file.name,
        folder,
        status: "uploading",
      };
      setFiles(prev => [...prev, newFile]);

      try {
        const initForm = new FormData();
        initForm.append("filename", file.name);
        initForm.append("content_type", file.type);
        initForm.append("folder_name", folder);
        const initRes = await fetch(`${BACKEND_URL}/upload/initiate`, {
          method: "POST",
          body: initForm,
        });
        const { upload_id, key } = await initRes.json();

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const parts: { part_number: number; etag: string }[] = [];
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const blob = file.slice(start, end);

          const partForm = new FormData();
          partForm.append("upload_id", upload_id);
          partForm.append("key", key);
          partForm.append("part_number", String(i + 1));
          partForm.append("chunk", blob, file.name);

          const partRes = await fetch(`${BACKEND_URL}/upload/${upload_id}/part`, {
            method: "POST",
            body: partForm,
          });
          const { etag } = await partRes.json();
          parts.push({ part_number: i + 1, etag });
        }

        await fetch(`${BACKEND_URL}/upload/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, upload_id, parts }),
        });

        setFiles(prev =>
          prev.map(f => {
            if (f.id !== id) return f;
            const updated: FileRecord = { ...f, status: "done" };
          return updated;
          })
        );
      } catch (err) {
        console.error(err);
        setFiles(prev =>
          prev.map(f => {
            if (f.id !== id) return f;
            const updated: FileRecord = { ...f, status: "failed" };
          return updated;
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-6">
      <div className="flex w-full items-center justify-between mb-4">
        <UploadDialog onUpload={handleUpload} />
        <Button variant="secondary" size="icon" className="size-8">
          <RefreshCw />
        </Button>
      </div>
      <UploadStatusTable files={files} />
      {/* <div className="mt-full py-4">
        <PaginationWithTable totalPages={20} />
      </div> */}
    </div>
  );
}
