<<<<<<< HEAD
import type {  ReportDashboardData  } from '../types/reportDashboard';
=======
import type { ReportDashboardData } from '../types/reportDashboard';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export const mockReportDashboardData: ReportDashboardData = {
  summary: {
    totalReports: 42,
    generatedReports: 35,
    pendingReports: 5,
    exportCount: 128,
  },
  trend: [
    { month: 'Jan', generated: 4 },
    { month: 'Feb', generated: 5 },
    { month: 'Mar', generated: 3 },
    { month: 'Apr', generated: 6 },
    { month: 'May', generated: 5 },
    { month: 'Jun', generated: 7 },
    { month: 'Jul', generated: 5 },
  ],
  departmentDistribution: [
    { department: 'ESG Office', count: 12 },
    { department: 'Finance', count: 8 },
    { department: 'HR', count: 6 },
    { department: 'Operations', count: 9 },
    { department: 'Legal', count: 5 },
    { department: 'Procurement', count: 7 },
  ],
  recentReports: [
    {
      id: 'rpt1',
      reportName: 'Q2 2026 ESG Summary Report',
      department: 'ESG Office',
      type: 'ESG Summary',
      createdDate: '2026-07-10',
      status: 'Generated',
    },
    {
      id: 'rpt2',
      reportName: 'H1 Carbon Emissions Analysis',
      department: 'Operations',
      type: 'Carbon Emissions',
      createdDate: '2026-07-08',
      status: 'Generated',
    },
    {
      id: 'rpt3',
      reportName: 'Supplier Compliance Audit Report',
      department: 'Procurement',
      type: 'Compliance',
      createdDate: '2026-07-05',
      status: 'Pending',
    },
    {
      id: 'rpt4',
      reportName: 'Workforce Diversity & Inclusion Report',
      department: 'HR',
      type: 'Social Impact',
      createdDate: '2026-07-01',
      status: 'Generated',
    },
    {
      id: 'rpt5',
      reportName: 'Board Governance Risk Overview',
      department: 'Legal',
      type: 'Governance',
      createdDate: '2026-06-28',
      status: 'Scheduled',
    },
  ],
};
