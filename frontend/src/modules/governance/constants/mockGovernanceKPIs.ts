import type {  GovernanceKPIData  } from '../types/governanceKPI';

export const mockGovernanceKPIData: GovernanceKPIData = {
  summary: {
    totalPolicies: 12,
    activePolicies: 9,
    complianceIssues: 4,
    resolvedIssues: 18,
    pendingCorrectiveActions: 3,
    completedAudits: 3,
    openAuditFindings: 2,
    criticalRisks: 2,
    overallGovernanceScore: 78,
  },
  complianceTrend: [
    { month: 'Jan', value: 62 },
    { month: 'Feb', value: 65 },
    { month: 'Mar', value: 60 },
    { month: 'Apr', value: 70 },
    { month: 'May', value: 68 },
    { month: 'Jun', value: 74 },
    { month: 'Jul', value: 78 },
  ],
  riskDistribution: [
    { severity: 'Low', count: 3 },
    { severity: 'Medium', count: 5 },
    { severity: 'High', count: 4 },
    { severity: 'Critical', count: 2 },
  ],
  auditPerformance: [
    { status: 'Completed', count: 3 },
    { status: 'In Progress', count: 1 },
    { status: 'Scheduled', count: 2 },
    { status: 'Cancelled', count: 1 },
  ],
};
