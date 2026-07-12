<<<<<<< HEAD
import type {  CorrectiveAction  } from '../types/correctiveAction';
=======
import type { CorrectiveAction } from '../types/correctiveAction';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export const initialMockCorrectiveActions: CorrectiveAction[] = [
  {
    id: 'ca1',
    title: 'Gather Q3 Carbon Offset Docs',
    description: 'Reach out to logistics partners to acquire the missing Q3 carbon offset certificates and upload them to the system.',
    relatedIssue: 'Missing Carbon Offset Documentation',
    department: 'Logistics',
    assignedTo: 'Sarah Connor',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-08-15',
    createdDate: '2026-07-10',
  },
  {
    id: 'ca2',
    title: 'Update Factory Reporting Protocol',
    description: 'Revise the factory safety reporting guidelines and conduct a mandatory training session for floor managers.',
    relatedIssue: 'Workplace Safety Incident Non-Reporting',
    department: 'Manufacturing',
    assignedTo: 'John Smith',
    priority: 'Critical',
    status: 'Pending',
    dueDate: '2026-07-20',
    createdDate: '2026-07-08',
  },
  {
    id: 'ca3',
    title: 'Distribute Updated Employee Handbook',
    description: 'Send out the new employee handbook featuring the diversity and inclusion policies to all regional offices.',
    relatedIssue: 'Outdated Employee Handbook',
    department: 'HR',
    assignedTo: 'Robert Brown',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-06-30',
    createdDate: '2026-06-15',
    completedDate: '2026-06-25',
  },
  {
    id: 'ca4',
    title: 'Conduct Emergency Vendor Screening',
    description: 'Immediately perform the mandatory anti-corruption screening for the two newly onboarded vendors.',
    relatedIssue: 'Vendor Anti-Corruption Screening Failure',
    department: 'Procurement',
    assignedTo: 'Jane Doe',
    priority: 'High',
    status: 'Overdue',
    dueDate: '2026-07-05',
    createdDate: '2026-07-01',
  }
];
