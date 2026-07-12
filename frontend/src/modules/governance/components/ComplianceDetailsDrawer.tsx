import React from 'react';
import type { ComplianceIssue } from '../types/compliance';
import { Modal } from '../../../shared/components/Modal';
import { ComplianceStatusBadge, ComplianceSeverityBadge } from './ComplianceStatusBadge';
import { Button } from '../../../shared/components/Button';

interface ComplianceDetailsDrawerProps {
  issue: ComplianceIssue | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (issue: ComplianceIssue) => void;
}

export function ComplianceDetailsDrawer({ issue, isOpen, onClose, onEdit }: ComplianceDetailsDrawerProps) {
  if (!issue) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compliance Issue Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(issue)}>
          Edit Issue
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{issue.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <ComplianceStatusBadge status={issue.status} />
            <ComplianceSeverityBadge severity={issue.severity} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {issue.description}
          </p>
        </div>

        {issue.resolutionNotes && (
          <div>
            <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Resolution Notes</h4>
            <p className="text-sm text-textPrimary leading-relaxed bg-success/10 border border-success/20 p-3 rounded-md">
              {issue.resolutionNotes}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div className="col-span-2">
            <span className="block text-xs text-textSecondary mb-1">Related Policy</span>
            <span className="text-sm font-medium text-textPrimary">{issue.policy}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{issue.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Assignee</span>
            <span className="text-sm font-medium text-textPrimary">{issue.assignee}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Created Date</span>
            <span className="text-sm font-medium text-textPrimary">{issue.createdAt}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Last Updated</span>
            <span className="text-sm font-medium text-textPrimary">{issue.updatedAt}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
