export type ComplianceSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type ComplianceStatus = 'Open' | 'In Progress' | 'Resolved';

export interface ComplianceIssue {
  id: string;
  title: string;
  description: string;
  policy: string;
  department: string;
  severity: ComplianceSeverity;
  status: ComplianceStatus;
  assignee: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceFormData {
  title: string;
  description: string;
  policy: string;
  department: string;
  severity: ComplianceSeverity;
  status: ComplianceStatus;
  assignee: string;
  resolutionNotes?: string;
}
