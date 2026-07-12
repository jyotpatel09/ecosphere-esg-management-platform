export type RiskCategory = 'Environmental' | 'Compliance' | 'Operational' | 'Financial' | 'Governance';
export type RiskLikelihood = 'Rare' | 'Possible' | 'Likely' | 'Almost Certain';
export type RiskImpact = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskStatus = 'Identified' | 'Monitoring' | 'Mitigated' | 'Closed';

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  department: string;
  owner: string;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  riskScore: number;
  severity: RiskSeverity;
  status: RiskStatus;
  mitigationPlan?: string;
  createdDate: string;
  reviewedDate?: string;
}

export interface RiskFormData {
  title: string;
  description: string;
  category: RiskCategory;
  department: string;
  owner: string;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  mitigationPlan?: string;
  status: RiskStatus;
}
