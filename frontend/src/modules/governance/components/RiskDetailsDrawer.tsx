import React from 'react';
import type { Risk } from '../types/risk';
import { Modal } from '../../../shared/components/Modal';
import { RiskSeverityBadge, RiskStatusBadge } from './RiskSeverityBadge';
import { Button } from '../../../shared/components/Button';

interface RiskDetailsDrawerProps {
  risk: Risk | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (risk: Risk) => void;
}

export function RiskDetailsDrawer({ risk, isOpen, onClose, onEdit }: RiskDetailsDrawerProps) {
  if (!risk) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Risk Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(risk)}>
          Edit Risk
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{risk.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <RiskStatusBadge status={risk.status} />
            <RiskSeverityBadge severity={risk.severity} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {risk.description}
          </p>
        </div>

        {risk.mitigationPlan && (
          <div>
            <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Mitigation Plan</h4>
            <p className="text-sm text-textPrimary leading-relaxed bg-info/10 border border-info/20 p-3 rounded-md">
              {risk.mitigationPlan}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div>
            <span className="block text-xs text-textSecondary mb-1">Category</span>
            <span className="text-sm font-medium text-textPrimary">{risk.category}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{risk.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Owner</span>
            <span className="text-sm font-medium text-textPrimary">{risk.owner}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Risk Score</span>
            <span className="text-sm font-medium text-textPrimary">
              {risk.riskScore} / 16
            </span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Likelihood</span>
            <span className="text-sm font-medium text-textPrimary">{risk.likelihood}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Impact</span>
            <span className="text-sm font-medium text-textPrimary">{risk.impact}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Identified Date</span>
            <span className="text-sm font-medium text-textPrimary">{risk.createdDate}</span>
          </div>
          {risk.reviewedDate && (
            <div>
              <span className="block text-xs text-textSecondary mb-1">Last Reviewed</span>
              <span className="text-sm font-medium text-textPrimary">{risk.reviewedDate}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
