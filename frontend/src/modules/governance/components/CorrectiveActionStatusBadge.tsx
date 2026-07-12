import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import type {  CorrectiveActionStatus, CorrectiveActionPriority  } from '../types/correctiveAction';

export function CorrectiveActionStatusBadge({ status }: { status: CorrectiveActionStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}

export function CorrectiveActionPriorityBadge({ priority }: { priority: CorrectiveActionPriority }) {
  const getVariant = () => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{priority}</Badge>;
}
