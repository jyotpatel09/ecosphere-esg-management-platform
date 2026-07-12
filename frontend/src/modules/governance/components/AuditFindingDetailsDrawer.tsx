import React from 'react';
import type { AuditFinding } from '../types/auditFinding';
import { Modal } from '../../../shared/components/Modal';
import { AuditFindingSeverityBadge, AuditFindingStatusBadge } from './AuditFindingSeverityBadge';
import { Button } from '../../../shared/components/Button';

interface AuditFindingDetailsDrawerProps {
  finding: AuditFinding | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (finding: AuditFinding) => void;
}

export function AuditFindingDetailsDrawer({ finding, isOpen, onClose, onEdit }: AuditFindingDetailsDrawerProps) {
  if (!finding) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Finding Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(finding)}>
          Edit Finding
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{finding.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <AuditFindingStatusBadge status={finding.status} />
            <AuditFindingSeverityBadge severity={finding.severity} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {finding.description}
          </p>
        </div>

        {finding.resolutionNotes && (
          <div>
            <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Resolution Notes</h4>
            <p className="text-sm text-textPrimary leading-relaxed bg-success/10 border border-success/20 p-3 rounded-md">
              {finding.resolutionNotes}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div className="col-span-2">
            <span className="block text-xs text-textSecondary mb-1">Related Audit</span>
            <span className="text-sm font-medium text-textPrimary">{finding.auditName}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{finding.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Assigned To</span>
            <span className="text-sm font-medium text-textPrimary">{finding.assignedTo}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Identified Date</span>
            <span className="text-sm font-medium text-textPrimary">{finding.identifiedDate}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Due Date</span>
            <span className="text-sm font-medium text-textPrimary">{finding.dueDate}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
