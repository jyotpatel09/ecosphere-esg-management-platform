import React from 'react';
import { cn } from './Button';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export function Loader({ size = 'md', className, fullScreen = false }: LoaderProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const loader = (
    <Loader2 className={cn('animate-spin text-primary', sizes[size], className)} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return loader;
}
