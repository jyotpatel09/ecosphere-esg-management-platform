import React from 'react';
import { Badge } from '../../../shared/components/Badge';
<<<<<<< HEAD
import type {  PolicyStatus  } from '../types/policy';
=======
import type { PolicyStatus } from '../types/policy';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

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
