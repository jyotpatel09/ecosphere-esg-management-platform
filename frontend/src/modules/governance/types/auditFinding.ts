export type AuditFindingSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type AuditFindingStatus = 'Open' | 'Under Review' | 'Resolved' | 'Closed';

export interface AuditFinding {
  id: string;
  auditId: string;
  auditName: string;
  title: string;
  description: string;
  department: string;
  severity: AuditFindingSeverity;
  status: AuditFindingStatus;
  assignedTo: string;
  dueDate: string;
  identifiedDate: string;
  resolutionNotes?: string;
}

export interface AuditFindingFormData {
  auditName: string;
  title: string;
  description: string;
  department: string;
  severity: AuditFindingSeverity;
  status: AuditFindingStatus;
  assignedTo: string;
  dueDate: string;
  resolutionNotes?: string;
}
