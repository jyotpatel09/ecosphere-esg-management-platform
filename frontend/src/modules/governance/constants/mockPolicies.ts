import { Policy } from '../types/policy';

export const initialMockPolicies: Policy[] = [
  {
    id: 'p1',
    title: 'Global Anti-Corruption and Bribery Policy',
    description: 'Establishes the code of conduct to prevent bribery, corruption, and unethical practices across all global operations and subsidiaries.',
    category: 'Ethics',
    owner: 'Jane Doe',
    department: 'Legal',
    status: 'Active',
    effectiveDate: '2025-01-01',
    lastUpdated: '2026-02-15',
    version: '2.1'
  },
  {
    id: 'p2',
    title: 'Supplier Code of Conduct',
    description: 'Guidelines and compliance requirements for all third-party vendors and suppliers regarding human rights, fair labor, and environmental responsibility.',
    category: 'Supply Chain',
    owner: 'John Smith',
    department: 'Procurement',
    status: 'Under Review',
    effectiveDate: '2024-05-10',
    lastUpdated: '2026-06-20',
    version: '1.4'
  },
  {
    id: 'p3',
    title: 'Data Privacy and Protection Standard',
    description: 'Mandates data handling practices to ensure compliance with GDPR, CCPA, and other global data protection regulations.',
    category: 'Data Privacy',
    owner: 'Alice Johnson',
    department: 'IT',
    status: 'Active',
    effectiveDate: '2025-11-01',
    lastUpdated: '2026-01-10',
    version: '3.0'
  },
  {
    id: 'p4',
    title: 'Workplace Diversity & Inclusion Policy',
    description: 'Sets the standard for hiring, promoting, and maintaining a diverse workforce free from discrimination.',
    category: 'Social',
    owner: 'Robert Brown',
    department: 'HR',
    status: 'Draft',
    effectiveDate: '2026-09-01',
    lastUpdated: '2026-07-05',
    version: '1.0'
  },
  {
    id: 'p5',
    title: 'Legacy Waste Management Rules',
    description: 'Old rules regarding hazardous waste disposal (replaced by Environmental Module).',
    category: 'Environmental',
    owner: 'Environmental Team',
    department: 'Operations',
    status: 'Archived',
    effectiveDate: '2020-01-01',
    lastUpdated: '2024-12-31',
    version: '1.0'
  }
];
