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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-0 transition-opacity">
      <div className={cn("ui-panel w-full max-w-lg shadow-modal overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200", className)}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold text-textPrimary tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="text-textSecondary hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
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
          <div className="p-4 sm:p-6 border-t border-white/5 bg-surface/30 flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
