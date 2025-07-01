"use client";
import { useRef } from "react";
import { TableDemo } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CloudUpload, RefreshCw } from "lucide-react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB per chunk
  const BACKEND_URL = "http://dpc2500015.local:65304";

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("選択されたファイル：", file);
    const initForm = new FormData();
    initForm.append("filename", file.name);
    initForm.append("content_type", file.type);
    const initRes = await fetch(`${BACKEND_URL}/upload/initiate`, {
      method: "POST",
      body: initForm,
    });
    const { upload_id, key } = await initRes.json();

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const parts = [];
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
  };

  return (
    <div className="flex flex-col items-center px-4 lg:px-6">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="flex w-full items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={handleButtonClick}>
          <CloudUpload />
          <span>Upload file</span>
        </Button>

        <Button variant="secondary" size="icon" className="size-8">
          <RefreshCw />
        </Button>
      </div>

      <TableDemo />
    </div>
  );
}
