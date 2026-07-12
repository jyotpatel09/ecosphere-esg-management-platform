import React from 'react';
<<<<<<< HEAD
import type {  CorrectiveAction  } from '../types/correctiveAction';
=======
import type { CorrectiveAction } from '../types/correctiveAction';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Modal } from '../../../shared/components/Modal';
import { CorrectiveActionStatusBadge, CorrectiveActionPriorityBadge } from './CorrectiveActionStatusBadge';
import { Button } from '../../../shared/components/Button';

interface CorrectiveActionDetailsDrawerProps {
  action: CorrectiveAction | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (action: CorrectiveAction) => void;
}

export function CorrectiveActionDetailsDrawer({ action, isOpen, onClose, onEdit }: CorrectiveActionDetailsDrawerProps) {
  if (!action) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Corrective Action Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(action)}>
          Edit Action
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{action.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <CorrectiveActionStatusBadge status={action.status} />
            <CorrectiveActionPriorityBadge priority={action.priority} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {action.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div className="col-span-2">
            <span className="block text-xs text-textSecondary mb-1">Related Compliance Issue</span>
            <span className="text-sm font-medium text-textPrimary">{action.relatedIssue}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{action.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Assigned To</span>
            <span className="text-sm font-medium text-textPrimary">{action.assignedTo}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Created Date</span>
            <span className="text-sm font-medium text-textPrimary">{action.createdDate}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Due Date</span>
            <span className="text-sm font-medium text-textPrimary">{action.dueDate}</span>
          </div>
          {action.completedDate && (
            <div className="col-span-2">
              <span className="block text-xs text-textSecondary mb-1">Completed Date</span>
              <span className="text-sm font-medium text-success">{action.completedDate}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
