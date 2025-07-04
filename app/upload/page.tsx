"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import UploadDialog from "@/components/upload/upload-dialog";
import { PaginationWithTable } from "@/components/upload/pagination-with-table";
import { UploadStatusTable, FileRecord } from "@/components/upload/upload-status-table";

export default function Home() {
  const [upload_wait_files, setUploadWaitFiles] = useState<FileRecord[]>([]);
  const [uploaded_files, setUploadedFiles] = useState<FileRecord[]>([]);
  const CHUNK_SIZE = 50 * 1024 * 1024;
  const BACKEND_URL = "http://dpc2500015.local:65304";

  useEffect(() => {
    reloadStatusList();
  }, []); 

  const handleUpload = async (selectedFiles: File[], folder: string) => {
    for (const file of selectedFiles) {
      const id = uuidv4() as unknown as FileRecord["id"];
      const tempRecord: FileRecord = {
        id,
        filename: file.name,
        folder,
        status: "WAIT_UPLOAD",
        create_time: new Date().toISOString(),
      };
      setUploadWaitFiles(prev => [tempRecord, ...prev]);
    }

    for (const file of selectedFiles) {
      setUploadWaitFiles(prev => prev.filter(f => f.filename !== file.name));
      const id = uuidv4() as unknown as FileRecord["id"];
      try {
        const initForm = new FormData();
        initForm.append("filename", file.name);
        initForm.append("content_type", file.type);
        initForm.append("folder_name", folder);
        initForm.append("parent", "root");
        initForm.append("hierarchy", "raw");
        const initRes = await fetch(`${BACKEND_URL}/upload/initiate`, {
          method: "POST",
          body: initForm,
        });
        reloadStatusList();
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
        reloadStatusList();
      } catch (err) {
        console.error(err);
        reloadStatusList();
      }
    }
  };

  const sortFilesByTime = (files: FileRecord[]): FileRecord[] => {
    return [...files].sort((b, a) =>
      a.create_time.localeCompare(b.create_time, undefined, { numeric: true })
    );
  };

  const reloadStatusList = async () => {
    try {
      const initRes = await fetch(`${BACKEND_URL}/upload/status`);
      const { files } = await initRes.json();

      const mapped: FileRecord[] = files.map((file: any) => ({
        id: file.file_id,
        filename: file.filename,
        folder: file.folder,
        status: file.status,
        create_time: file.create_time
      }));

      setUploadedFiles(sortFilesByTime(mapped));

      for(const data of upload_wait_files){
        setUploadedFiles(prev => [data, ...prev])
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between px-4 lg:px-6">
      <div className="flex w-full items-center justify-between mb-4">
        <UploadDialog onUpload={handleUpload} />
        <Button variant="outline" size="icon" className="size-8" onClick={reloadStatusList}>
          <RefreshCw />
        </Button>
      </div>
      <UploadStatusTable files={uploaded_files} />
      {/* <div className="mt-full py-4">
        <PaginationWithTable totalPages={20} />
      </div> */}
    </div>
  );
}
