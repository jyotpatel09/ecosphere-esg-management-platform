import React from 'react';
import { Badge } from '../../../shared/components/Badge';
<<<<<<< HEAD
import type {  ESGReportStatus  } from '../types/esgReport';
=======
import type { ESGReportStatus } from '../types/esgReport';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

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
