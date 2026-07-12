import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import type {  ComplianceStatus, ComplianceSeverity  } from '../types/compliance';

export function ComplianceStatusBadge({ status }: { status: ComplianceStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'In Progress': return 'warning';
      case 'Open': return 'danger';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}

export function ComplianceSeverityBadge({ severity }: { severity: ComplianceSeverity }) {
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
