"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Props の型を定義
interface PaginationWithTableProps {
  totalPages: number       // 総ページ数
  maxSize?: number         // 表示するページ番号の最大要素数（オプション、デフォルト付き）
}

export function PaginationWithTable({
  totalPages,
  maxSize = 3,             // デフォルト値を 3 に設定
}: PaginationWithTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const goPrev = () => setCurrentPage(p => Math.max(1, p - 1))
  const goNext = () => setCurrentPage(p => Math.min(totalPages, p + 1))

  const half = Math.floor(maxSize / 2)
  let start = Math.max(1, currentPage - half)
  let end = start + maxSize - 1
  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - maxSize + 1)
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" onClick={goPrev} disabled={currentPage === 1}>
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
          </>
        )}

        {pages.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(totalPages)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button variant="ghost" onClick={goNext} disabled={currentPage === totalPages}>
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
