import type { ReportExport } from '../types/reportExport';

export const initialMockReportExports: ReportExport[] = [
  {
    id: 'exp-1',
    reportName: '2023 Q3 Carbon Emissions',
    exportFormat: 'PDF',
    requestedBy: 'Jane Doe',
    department: 'Environment',
    status: 'Completed',
    fileSize: '2.4 MB',
    createdDate: '2024-03-01T09:00:00Z',
    completedDate: '2024-03-01T09:05:00Z',
    notes: 'Include all executive summaries.',
  },
  {
    id: 'exp-2',
    reportName: 'Annual Diversity & Inclusion',
    exportFormat: 'Excel',
    requestedBy: 'John Smith',
    department: 'HR',
    status: 'Processing',
    createdDate: '2024-03-05T14:30:00Z',
    notes: 'Raw data format required for pivot tables.',
  },
  {
    id: 'exp-3',
    reportName: 'Water Usage Q1 2024',
    exportFormat: 'CSV',
    requestedBy: 'Admin User',
    department: 'Operations',
    status: 'Requested',
    createdDate: '2024-03-06T10:15:00Z',
  },
  {
    id: 'exp-4',
    reportName: '2023 Supplier Compliance Audit',
    exportFormat: 'PDF',
    requestedBy: 'Sarah Connor',
    department: 'Supply Chain',
    status: 'Failed',
    createdDate: '2024-03-02T11:20:00Z',
    notes: 'Failed due to missing supplier data.',
  }
];
