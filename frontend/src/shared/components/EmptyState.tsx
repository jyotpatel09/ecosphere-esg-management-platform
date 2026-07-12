import React from 'react';
import { cn } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center border border-dashed border-surfaceHighlight rounded-lg bg-surface/50", className)}>
      {icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surfaceHighlight/50 mb-4 text-textSecondary">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-textPrimary">{title}</h3>
      {description && <p className="mt-1 text-sm text-textSecondary">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
