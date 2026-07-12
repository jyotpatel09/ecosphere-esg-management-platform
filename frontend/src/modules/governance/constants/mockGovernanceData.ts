import { GovernanceDashboardData } from '../types';

export const mockGovernanceData: GovernanceDashboardData = {
  kpis: {
    totalPolicies: 24,
    openComplianceIssues: 7,
    upcomingAudits: 3,
    highRisks: 2,
  },
  recentAudits: [
    {
      id: 'a1',
      auditName: 'Q3 Internal Environmental Audit',
      department: 'Operations',
      scheduledDate: '2026-08-15',
      status: 'PLANNED',
    },
    {
      id: 'a2',
      auditName: 'Supplier Code of Conduct Review',
      department: 'Procurement',
      scheduledDate: '2026-07-20',
      status: 'ONGOING',
    },
    {
      id: 'a3',
      auditName: 'Data Privacy Compliance Check',
      department: 'IT',
      scheduledDate: '2026-06-10',
      status: 'COMPLETED',
    },
  ],
  recentComplianceIssues: [
    {
      id: 'c1',
      issue: 'Missing Carbon Offset Documentation',
      department: 'Logistics',
      severity: 'MEDIUM',
      status: 'INVESTIGATING',
    },
    {
      id: 'c2',
      issue: 'Workplace Safety Incident Non-Reporting',
      department: 'Manufacturing',
      severity: 'CRITICAL',
      status: 'OPEN',
    },
    {
      id: 'c3',
      issue: 'Outdated Employee Handbook',
      department: 'HR',
      severity: 'LOW',
      status: 'RESOLVED',
    },
    {
      id: 'c4',
      issue: 'Vendor Anti-Corruption Screening Failure',
      department: 'Procurement',
      severity: 'HIGH',
      status: 'OPEN',
    },
  ],
};
