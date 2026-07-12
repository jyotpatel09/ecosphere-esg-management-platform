import React from 'react';
import type { ReportExport } from '../types/reportExport';
import { ExportFormatBadge, ExportStatusBadge } from './ExportFormatBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Button } from '../../../shared/components/Button';
import { DownloadCloud, Eye, Trash2 } from 'lucide-react';

interface ReportExportTableProps {
  exports: ReportExport[];
  onView: (req: ReportExport) => void;
  onDelete: (req: ReportExport) => void;
}

export function ReportExportTable({ exports, onView, onDelete }: ReportExportTableProps) {
  if (exports.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={<DownloadCloud className="h-8 w-8" />}
          title="No export requests"
          description="There are no report export requests matching your criteria."
        />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report Name</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Requested By</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exports.map((req) => (
          <TableRow key={req.id}>
            <TableCell className="font-medium text-textPrimary">
              {req.reportName}
            </TableCell>
            <TableCell>
              <ExportFormatBadge format={req.exportFormat} />
            </TableCell>
            <TableCell className="text-textSecondary">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {req.requestedBy.charAt(0)}
                </div>
                {req.requestedBy}
              </div>
            </TableCell>
            <TableCell className="text-textSecondary">{req.department}</TableCell>
            <TableCell>
              <ExportStatusBadge status={req.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap text-sm text-textSecondary">
              {new Date(req.createdDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(req)}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View Details</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(req)} className="text-danger hover:bg-danger/10 hover:text-danger">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
