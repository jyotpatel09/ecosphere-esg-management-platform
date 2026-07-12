import type { ReportHistoryEvent } from '../types/reportHistory';

export const initialMockReportHistory: ReportHistoryEvent[] = [
  {
    id: 'hist-1',
    reportId: 'esg1',
    reportTitle: '2023 Q3 Carbon Emissions',
    actionType: 'PUBLISHED',
    changedBy: 'Admin User',
    timestamp: '2023-10-15T14:30:00Z',
    details: 'Report officially published to stakeholders.',
  },
  {
    id: 'hist-2',
    reportId: 'esg2',
    reportTitle: 'Annual Diversity & Inclusion',
    actionType: 'REVIEWED',
    changedBy: 'Jane Doe',
    timestamp: '2023-11-02T09:15:00Z',
    details: 'Reviewed and approved by the HR department head.',
  },
  {
    id: 'hist-3',
    reportId: 'esg3',
    reportTitle: 'Water Usage Q1 2024',
    actionType: 'CREATED',
    changedBy: 'John Smith',
    timestamp: '2024-04-05T11:20:00Z',
    details: 'Initial draft created for Q1 water usage metrics.',
  },
  {
    id: 'hist-4',
    reportId: 'esg1',
    reportTitle: '2023 Q3 Carbon Emissions',
    actionType: 'STATUS_CHANGED',
    changedBy: 'Admin User',
    timestamp: '2023-10-14T16:45:00Z',
    details: 'Status changed from Reviewed to Published.',
  },
  {
    id: 'hist-5',
    reportId: 'esg2',
    reportTitle: 'Annual Diversity & Inclusion',
    actionType: 'UPDATED',
    changedBy: 'Jane Doe',
    timestamp: '2023-10-28T10:00:00Z',
    details: 'Updated gender distribution metrics on page 4.',
  }
];
