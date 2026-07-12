export type ReportStatus = 'Generated' | 'Pending' | 'Failed' | 'Scheduled';
export type ReportType = 'ESG Summary' | 'Compliance' | 'Carbon Emissions' | 'Social Impact' | 'Governance';

export interface ReportDashboardSummary {
  totalReports: number;
  generatedReports: number;
  pendingReports: number;
  exportCount: number;
}

export interface ReportTrendPoint {
  month: string;
  generated: number;
}

export interface DepartmentReportPoint {
  department: string;
  count: number;
}

export interface RecentReport {
  id: string;
  reportName: string;
  department: string;
  type: ReportType;
  createdDate: string;
  status: ReportStatus;
}

export interface ReportDashboardData {
  summary: ReportDashboardSummary;
  trend: ReportTrendPoint[];
  departmentDistribution: DepartmentReportPoint[];
  recentReports: RecentReport[];
}
