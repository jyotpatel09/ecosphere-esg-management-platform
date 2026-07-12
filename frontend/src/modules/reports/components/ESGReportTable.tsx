import React from 'react';
import { ESGReport } from '../types/esgReport';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { ReportStatusBadge } from './ReportStatusBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { FileText } from 'lucide-react';

interface ESGReportTableProps {
  reports: ESGReport[];
  onView: (report: ESGReport) => void;
  onEdit: (report: ESGReport) => void;
  onDelete: (report: ESGReport) => void;
}

export function ESGReportTable({ reports, onView, onEdit, onDelete }: ESGReportTableProps) {
  if (reports.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="No reports found"
        description="Try adjusting your search or filters, or create a new report."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Reporting Period</TableHead>
          <TableHead>Created Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell className="font-medium max-w-[220px] truncate" title={report.title}>
              {report.title}
            </TableCell>
            <TableCell>
              <span className="text-xs text-textSecondary bg-surfaceHighlight/50 px-2 py-1 rounded whitespace-nowrap">
                {report.reportType}
              </span>
            </TableCell>
            <TableCell>{report.department}</TableCell>
            <TableCell>{report.reportingPeriod}</TableCell>
            <TableCell>{report.createdDate}</TableCell>
            <TableCell>
              <ReportStatusBadge status={report.status} />
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(report)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(report)} title="Edit Report">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(report)} className="text-danger hover:text-red-700" title="Delete Report">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
