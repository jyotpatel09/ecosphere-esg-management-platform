export type ReportExportFormat = 'PDF' | 'Excel' | 'CSV';
export type ReportExportStatus = 'Requested' | 'Processing' | 'Completed' | 'Failed';

export interface ReportExport {
  id: string;
  reportId?: string;
  reportName: string;
  exportFormat: ReportExportFormat;
  requestedBy: string;
  department: string;
  status: ReportExportStatus;
  fileSize?: string;
  createdDate: string;
  completedDate?: string;
  notes?: string;
}

export interface ReportExportFormData {
  reportName: string;
  exportFormat: ReportExportFormat;
  department: string;
  notes?: string;
}
