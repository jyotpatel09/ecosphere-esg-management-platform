import React from 'react';
import type { ReportExportFormat, ReportExportStatus } from '../types/reportExport';
import { Badge } from '../../../shared/components/Badge';

interface ExportFormatBadgeProps {
  format: ReportExportFormat;
}

export function ExportFormatBadge({ format }: ExportFormatBadgeProps) {
  const formatColors: Record<ReportExportFormat, 'danger' | 'success' | 'info'> = {
    PDF: 'danger',
    Excel: 'success',
    CSV: 'info',
  };

  return <Badge variant={formatColors[format]}>{format}</Badge>;
}

interface ExportStatusBadgeProps {
  status: ReportExportStatus;
}

export function ExportStatusBadge({ status }: ExportStatusBadgeProps) {
  const statusColors: Record<ReportExportStatus, 'default' | 'info' | 'success' | 'danger'> = {
    Requested: 'default',
    Processing: 'info',
    Completed: 'success',
    Failed: 'danger',
  };

  return <Badge variant={statusColors[status]}>{status}</Badge>;
}
