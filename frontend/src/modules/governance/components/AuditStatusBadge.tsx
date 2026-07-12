import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import type {  AuditStatus, AuditType  } from '../types/audit';

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
