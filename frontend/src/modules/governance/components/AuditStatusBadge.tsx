import React from 'react';
import { Badge } from '../../../shared/components/Badge';
<<<<<<< HEAD
import type {  AuditStatus, AuditType  } from '../types/audit';
=======
import type { AuditStatus, AuditType } from '../types/audit';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export function AuditStatusBadge({ status }: { status: AuditStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Scheduled': return 'warning';
      case 'Cancelled': return 'default';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}

export function AuditTypeBadge({ type }: { type: AuditType }) {
  const getVariant = () => {
    switch (type) {
      case 'Compliance': return 'danger';
      case 'Internal': return 'info';
      case 'External': return 'warning';
      case 'ESG Review': return 'info';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{type}</Badge>;
}
