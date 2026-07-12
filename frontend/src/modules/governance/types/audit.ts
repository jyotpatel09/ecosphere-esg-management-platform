export type AuditStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type AuditType = 'Internal' | 'External' | 'Compliance' | 'ESG Review';

export interface Audit {
  id: string;
  auditName: string;
  description: string;
  department: string;
  auditor: string;
  auditType: AuditType;
  scheduledDate: string;
  completedDate?: string;
  status: AuditStatus;
  findingsCount: number;
}

export interface AuditFormData {
  auditName: string;
  description: string;
  department: string;
  auditor: string;
  auditType: AuditType;
  scheduledDate: string;
  status: AuditStatus;
}
