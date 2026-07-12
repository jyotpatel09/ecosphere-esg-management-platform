import React from 'react';
<<<<<<< HEAD
import type {  ESGReport  } from '../types/esgReport';
=======
import type { ESGReport } from '../types/esgReport';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Modal } from '../../../shared/components/Modal';
import { ReportStatusBadge } from './ReportStatusBadge';
import { Button } from '../../../shared/components/Button';
import { ExternalLink } from 'lucide-react';

interface ReportDetailsDrawerProps {
  report: ESGReport | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (report: ESGReport) => void;
}

export function ReportDetailsDrawer({ report, isOpen, onClose, onEdit }: ReportDetailsDrawerProps) {
  if (!report) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Report Details"
      footer={
        <Button variant="primary" onClick={() => onEdit(report)}>
          Edit Report
        </Button>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-textPrimary">{report.title}</h3>
          <div className="mt-2">
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Description</h4>
          <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHighlight/30 p-3 rounded-md">
            {report.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-surfaceHighlight pt-4">
          <div>
            <span className="block text-xs text-textSecondary mb-1">Report Type</span>
            <span className="text-sm font-medium text-textPrimary">{report.reportType}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Department</span>
            <span className="text-sm font-medium text-textPrimary">{report.department}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Reporting Period</span>
            <span className="text-sm font-medium text-textPrimary">{report.reportingPeriod}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Created By</span>
            <span className="text-sm font-medium text-textPrimary">{report.createdBy}</span>
          </div>
          <div>
            <span className="block text-xs text-textSecondary mb-1">Created Date</span>
            <span className="text-sm font-medium text-textPrimary">{report.createdDate}</span>
          </div>
        </div>

        {report.fileUrl && (
          <div className="border-t border-surfaceHighlight pt-4">
            <a
              href={report.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View Report File
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
