import React from 'react';
import { cn } from './Button';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-[13px] font-semibold leading-none text-textPrimary peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1.5 block',
        className
      )}
      {...props}
    />
  )
);
Label.displayName = 'Label';
