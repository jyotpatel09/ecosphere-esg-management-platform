import React from 'react';
import { Badge } from '../../../shared/components/Badge';
<<<<<<< HEAD
import type {  RiskSeverity, RiskStatus  } from '../types/risk';
=======
import type { RiskSeverity, RiskStatus } from '../types/risk';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export function RiskSeverityBadge({ severity }: { severity: RiskSeverity }) {
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

export function RiskStatusBadge({ status }: { status: RiskStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Closed': return 'default';
      case 'Mitigated': return 'success';
      case 'Monitoring': return 'info';
      case 'Identified': return 'warning';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
