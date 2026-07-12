export type CorrectiveActionStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
export type CorrectiveActionPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  relatedIssue: string;
  department: string;
  assignedTo: string;
  priority: CorrectiveActionPriority;
  status: CorrectiveActionStatus;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
}

export interface CorrectiveActionFormData {
  title: string;
  description: string;
  relatedIssue: string;
  department: string;
  assignedTo: string;
  priority: CorrectiveActionPriority;
  status: CorrectiveActionStatus;
  dueDate: string;
}
