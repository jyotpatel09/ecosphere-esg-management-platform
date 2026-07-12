import React from 'react';
import { Badge } from '../../../shared/components/Badge';
import { ESGReportStatus } from '../types/esgReport';

export function ReportStatusBadge({ status }: { status: ESGReportStatus }) {
  const getVariant = () => {
    switch (status) {
      case 'Published': return 'success';
      case 'Reviewed': return 'info';
      case 'Generated': return 'warning';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

  return <Badge variant={getVariant()}>{status}</Badge>;
}
