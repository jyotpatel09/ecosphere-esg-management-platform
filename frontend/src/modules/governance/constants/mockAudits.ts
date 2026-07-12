import type { Audit } from '../types/audit';

export const initialMockAudits: Audit[] = [
  {
    id: 'au1',
    auditName: 'Q3 Internal Environmental Audit',
    description: 'Quarterly review of environmental standard operating procedures and emissions reporting.',
    department: 'Operations',
    auditor: 'Sarah Connor',
    auditType: 'Internal',
    scheduledDate: '2026-08-15',
    status: 'Scheduled',
    findingsCount: 0,
  },
  {
    id: 'au2',
    auditName: 'Supplier Code of Conduct Review',
    description: 'Extensive evaluation of top 50 suppliers against the newly updated code of conduct regarding labor practices.',
    department: 'Procurement',
    auditor: 'External Firm LLC',
    auditType: 'External',
    scheduledDate: '2026-07-20',
    status: 'In Progress',
    findingsCount: 2,
  },
  {
    id: 'au3',
    auditName: 'Data Privacy Compliance Check',
    description: 'Annual GDPR and CCPA data privacy compliance audit.',
    department: 'IT',
    auditor: 'Alice Johnson',
    auditType: 'Compliance',
    scheduledDate: '2026-06-10',
    completedDate: '2026-06-14',
    status: 'Completed',
    findingsCount: 5,
  },
  {
    id: 'au4',
    auditName: 'Diversity & Inclusion ESG Review',
    description: 'Review of HR hiring practices and diversity metrics for the annual ESG report.',
    department: 'HR',
    auditor: 'Robert Brown',
    auditType: 'ESG Review',
    scheduledDate: '2026-09-01',
    status: 'Cancelled',
    findingsCount: 0,
  }
];
