import React from 'react';
import type { Policy } from '../types/policy';
import { Modal } from '../../../shared/components/Modal';
import { PolicyStatusBadge } from './PolicyStatusBadge';
import { Button } from '../../../shared/components/Button';

interface PolicyDetailsDrawerProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (policy: Policy) => void;
}

export function PolicyDetailsDrawer({ policy, isOpen, onClose, onEdit }: PolicyDetailsDrawerProps) {
  if (!policy) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Policy Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(policy)}>
          Edit Policy
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{policy.title}</h3>
          <div className="mt-2">
            <PolicyStatusBadge status={policy.status} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {policy.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div>
            <span className="block text-xs text-textSecondary mb-1">Category</span>
            <span className="text-sm font-medium text-textPrimary">{policy.category}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{policy.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Owner</span>
            <span className="text-sm font-medium text-textPrimary">{policy.owner}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Version</span>
            <span className="text-sm font-medium text-textPrimary">v{policy.version}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Effective Date</span>
            <span className="text-sm font-medium text-textPrimary">{policy.effectiveDate}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Last Updated</span>
            <span className="text-sm font-medium text-textPrimary">{policy.lastUpdated}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
