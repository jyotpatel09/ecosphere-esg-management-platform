import React from 'react';
import { Audit } from '../types/audit';
import { Modal } from '../../../shared/components/Modal';
import { AuditStatusBadge, AuditTypeBadge } from './AuditStatusBadge';
import { Button } from '../../../shared/components/Button';

interface AuditDetailsDrawerProps {
  audit: Audit | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (audit: Audit) => void;
}

export function AuditDetailsDrawer({ audit, isOpen, onClose, onEdit }: AuditDetailsDrawerProps) {
  if (!audit) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(audit)}>
          Edit Audit
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{audit.auditName}</h3>
          <div className="mt-2 flex items-center gap-2">
            <AuditStatusBadge status={audit.status} />
            <AuditTypeBadge type={audit.auditType} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {audit.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{audit.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Auditor</span>
            <span className="text-sm font-medium text-textPrimary">{audit.auditor}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Scheduled Date</span>
            <span className="text-sm font-medium text-textPrimary">{audit.scheduledDate}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Findings Count</span>
            <span className="text-sm font-medium text-textPrimary">{audit.findingsCount}</span>
          </div>
          {audit.completedDate && (
            <div className="col-span-2">
              <span className="block text-xs text-textSecondary mb-1">Completed Date</span>
              <span className="text-sm font-medium text-success">{audit.completedDate}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
