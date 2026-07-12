import React from 'react';
import { cn } from './Button';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-surfaceHighlight", className)}
      {...props}
    />
  );
}

export function SkeletonLoader({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-4 w-full p-4", className)}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Skeleton className="h-6 w-1/4 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-full rounded-md opacity-70" />
            <Skeleton className="h-10 w-32 rounded-md hidden sm:block opacity-70" />
            <Skeleton className="h-10 w-24 rounded-md hidden sm:block opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
}
