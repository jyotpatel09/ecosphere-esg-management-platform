export type PolicyStatus = 'Draft' | 'Active' | 'Under Review' | 'Archived';

export interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  owner: string;
  department: string;
  status: PolicyStatus;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
}

export interface PolicyFormData {
  title: string;
  description: string;
  category: string;
  owner: string;
  department: string;
  status: PolicyStatus;
  effectiveDate: string;
}
