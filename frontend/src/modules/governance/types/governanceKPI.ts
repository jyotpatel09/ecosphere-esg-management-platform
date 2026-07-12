export interface GovernanceKPISummary {
  totalPolicies: number;
  activePolicies: number;
  complianceIssues: number;
  resolvedIssues: number;
  pendingCorrectiveActions: number;
  completedAudits: number;
  openAuditFindings: number;
  criticalRisks: number;
  overallGovernanceScore: number;
}

export interface ComplianceTrendPoint {
  month: string;
  value: number;
}

export interface RiskDistributionPoint {
  severity: string;
  count: number;
}

export interface AuditPerformancePoint {
  status: string;
  count: number;
}

export interface GovernanceKPIData {
  summary: GovernanceKPISummary;
  complianceTrend: ComplianceTrendPoint[];
  riskDistribution: RiskDistributionPoint[];
  auditPerformance: AuditPerformancePoint[];
}
