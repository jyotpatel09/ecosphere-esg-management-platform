import React from 'react';
import type { ReportExport, ReportExportStatus } from '../types/reportExport';
import { ExportFormatBadge, ExportStatusBadge } from './ExportFormatBadge';
import { Button } from '../../../shared/components/Button';
import { X, Calendar, User, Building, FileText, CheckCircle, RefreshCcw, HardDrive } from 'lucide-react';
import { cn } from '../../../shared/components/Button'; // Assuming cn is exported here in the current arch

interface ReportExportDetailsDrawerProps {
  isOpen: boolean;
  exportRequest: ReportExport | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: ReportExportStatus) => void;
}

export function ReportExportDetailsDrawer({ isOpen, exportRequest, onClose, onUpdateStatus }: ReportExportDetailsDrawerProps) {
  if (!isOpen || !exportRequest) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] border-l border-surfaceHighlight bg-surface p-6 shadow-xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-surfaceHighlight">
            <h2 className="text-lg font-semibold text-textPrimary">Export Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-textSecondary uppercase tracking-wider mb-2">Report Info</h3>
              <p className="text-base font-semibold text-textPrimary">{exportRequest.reportName}</p>
              <div className="mt-2 flex items-center gap-2">
                <ExportFormatBadge format={exportRequest.exportFormat} />
                <ExportStatusBadge status={exportRequest.status} />
              </div>
            </div>

            <div className="space-y-4 border-t border-surfaceHighlight pt-6">
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-textSecondary" />
                <div className="flex-1">
                  <p className="text-textSecondary">Requested By</p>
                  <p className="font-medium text-textPrimary">{exportRequest.requestedBy}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-textSecondary" />
                <div className="flex-1">
                  <p className="text-textSecondary">Department</p>
                  <p className="font-medium text-textPrimary">{exportRequest.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-textSecondary" />
                <div className="flex-1">
                  <p className="text-textSecondary">Requested On</p>
                  <p className="font-medium text-textPrimary">
                    {new Date(exportRequest.createdDate).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {exportRequest.completedDate && (
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div className="flex-1">
                    <p className="text-textSecondary">Completed On</p>
                    <p className="font-medium text-textPrimary">
                      {new Date(exportRequest.completedDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {exportRequest.fileSize && (
                <div className="flex items-center gap-3 text-sm">
                  <HardDrive className="h-4 w-4 text-textSecondary" />
                  <div className="flex-1">
                    <p className="text-textSecondary">File Size</p>
                    <p className="font-medium text-textPrimary">{exportRequest.fileSize}</p>
                  </div>
                </div>
              )}
            </div>

            {exportRequest.notes && (
              <div className="border-t border-surfaceHighlight pt-6">
                <div className="flex items-start gap-3 text-sm">
                  <FileText className="h-4 w-4 text-textSecondary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-textSecondary mb-1">Notes</p>
                    <p className="text-textPrimary bg-surfaceHighlight/50 p-3 rounded-md border border-surfaceHighlight">
                      {exportRequest.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {onUpdateStatus && (
            <div className="border-t border-surfaceHighlight pt-4 pb-2 space-y-3">
              {exportRequest.status === 'Requested' && (
                <Button 
                  variant="primary" 
                  className="w-full justify-center" 
                  onClick={() => onUpdateStatus(exportRequest.id, 'Processing')}
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Start Processing
                </Button>
              )}
              {exportRequest.status === 'Processing' && (
                <div className="flex gap-3">
                  <Button 
                    variant="primary" 
                    className="flex-1 justify-center" 
                    onClick={() => onUpdateStatus(exportRequest.id, 'Completed')}
                  >
                    Mark Completed
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 justify-center text-danger border-danger/20 hover:bg-danger/10"
                    onClick={() => onUpdateStatus(exportRequest.id, 'Failed')}
                  >
                    Mark Failed
                  </Button>
                </div>
              )}
              {exportRequest.status === 'Completed' && (
                <Button variant="primary" className="w-full justify-center">
                  Download File
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
