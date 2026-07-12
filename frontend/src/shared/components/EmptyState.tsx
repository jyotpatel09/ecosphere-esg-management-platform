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
    <div className={cn("flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-xl bg-surface/50 transition-all hover:bg-surfaceHighlight", className)}>
      {icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-surfaceHighlight mb-4 text-textSecondary group-hover:text-primary transition-colors">
          <div className="scale-110">{icon}</div>
        </div>
      )}
      <h3 className="text-base font-semibold text-textPrimary tracking-tight">{title}</h3>
      {description && <p className="mt-2 text-sm text-textSecondary max-w-sm mx-auto leading-relaxed">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
