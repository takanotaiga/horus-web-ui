"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const titleMap: Record<string, string> = {
  "/upload": "Upload",
  "/image-gallery": "Image Gallery",
  "/ai-factory": "AI Factory",
  "/analyze": "Analyze",
  // 必要に応じて他のルートも追加
};

export function SiteHeader() {
  const pathname = usePathname();
  // マッピングがなければデフォルトを表示
  const title = titleMap[pathname] ?? "Horus Inference";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
