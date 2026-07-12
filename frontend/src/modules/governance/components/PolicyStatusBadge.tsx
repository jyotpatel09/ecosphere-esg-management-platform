import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import type {  PolicyStatus  } from '../types/policy';

export function PolicyStatusBadge({ status }: { status: PolicyStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Active': return 'success';
      case 'Draft': return 'warning';
      case 'Under Review': return 'info';
      case 'Archived': return 'default';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
