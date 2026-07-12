export type ESGReportType = 'ESG Summary' | 'Sustainability Report' | 'Compliance Report' | 'Carbon Report';
export type ESGReportStatus = 'Draft' | 'Generated' | 'Reviewed' | 'Published';

export interface ESGReport {
  id: string;
  title: string;
  reportType: ESGReportType;
  department: string;
  reportingPeriod: string;
  createdBy: string;
  createdDate: string;
  status: ESGReportStatus;
  description: string;
  fileUrl?: string;
}

export interface ESGReportFormData {
  title: string;
  reportType: ESGReportType;
  department: string;
  reportingPeriod: string;
  description: string;
  status: ESGReportStatus;
}
