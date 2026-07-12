import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import type { AuditFindingSeverity, AuditFindingStatus } from '../types/auditFinding';

export function AuditFindingSeverityBadge({ severity }: { severity: AuditFindingSeverity }) {
  const getVariant = () => {
    switch (severity) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{severity}</Badge>;
}

export function AuditFindingStatusBadge({ status }: { status: AuditFindingStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Closed': return 'default';
      case 'Resolved': return 'success';
      case 'Under Review': return 'warning';
      case 'Open': return 'danger';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
