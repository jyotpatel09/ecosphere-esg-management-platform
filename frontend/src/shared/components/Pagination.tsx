import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  return (
    <nav className={cn('flex items-center justify-center space-x-2', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-surfaceHighlight bg-transparent p-0 text-sm font-medium transition-colors hover:bg-surfaceHighlight disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </button>
      <div className="flex items-center space-x-1 text-sm font-medium">
        <span className="text-textPrimary">Page {currentPage} of {totalPages}</span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-surfaceHighlight bg-transparent p-0 text-sm font-medium transition-colors hover:bg-surfaceHighlight disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </button>
    </nav>
  );
}
