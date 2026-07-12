import React from 'react';
import { X } from 'lucide-react';
import { cn } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, footer, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-0">
      <div className={cn("bg-surface w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", className)}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-surfaceHighlight">
          <h2 className="text-lg font-semibold text-textPrimary">{title}</h2>
          <button 
            onClick={onClose}
            className="text-textSecondary hover:text-textPrimary transition-colors p-1 rounded-md hover:bg-surfaceHighlight"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 sm:p-6 border-t border-surfaceHighlight bg-surface/50 flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
