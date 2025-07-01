"use client";
import { useRef } from "react";
import { TableDemo } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CloudUpload, RefreshCw } from "lucide-react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("選択されたファイル：", file);
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
