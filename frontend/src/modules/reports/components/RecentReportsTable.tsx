import React from 'react';
<<<<<<< HEAD
import type {  RecentReport, ReportStatus  } from '../types/reportDashboard';
=======
import type { RecentReport, ReportStatus } from '../types/reportDashboard';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { EmptyState } from '../../../shared/components/EmptyState';
import { FileText } from 'lucide-react';

interface RecentReportsTableProps {
  reports: RecentReport[];
}

function getStatusVariant(status: ReportStatus): 'success' | 'warning' | 'danger' | 'info' | 'default' {
  switch (status) {
    case 'Generated': return 'success';
    case 'Pending': return 'warning';
    case 'Failed': return 'danger';
    case 'Scheduled': return 'info';
    default: return 'default';
  }
}

export function RecentReportsTable({ reports }: RecentReportsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {reports.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={<FileText className="h-6 w-6" />}
              title="No reports yet"
              description="Generated reports will appear here."
            />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium max-w-[220px] truncate" title={report.reportName}>
                    {report.reportName}
                  </TableCell>
                  <TableCell>{report.department}</TableCell>
                  <TableCell>
                    <span className="text-xs text-textSecondary bg-surfaceHighlight/50 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </TableCell>
                  <TableCell>{report.createdDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
