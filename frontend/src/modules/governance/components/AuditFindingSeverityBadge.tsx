import React from 'react';
import { Badge } from '../../../shared/components/Badge';
<<<<<<< HEAD
import type {  AuditFindingSeverity, AuditFindingStatus  } from '../types/auditFinding';
=======
import type { AuditFindingSeverity, AuditFindingStatus } from '../types/auditFinding';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

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
