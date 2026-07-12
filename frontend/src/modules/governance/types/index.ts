export interface GovernanceKPIs {
  totalPolicies: number;
  openComplianceIssues: number;
  upcomingAudits: number;
  highRisks: number;
}

export interface AuditItem {
  id: string;
  auditName: string;
  department: string;
  scheduledDate: string;
  status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export interface ComplianceIssueItem {
  id: string;
  issue: string;
  department: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
}

export interface GovernanceDashboardData {
  kpis: GovernanceKPIs;
  recentAudits: AuditItem[];
  recentComplianceIssues: ComplianceIssueItem[];
}
