import React from 'react';
import type { AuditItem } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { EmptyState } from '../../../shared/components/EmptyState';
import { CalendarClock } from 'lucide-react';

interface RecentAuditsTableProps {
  audits: AuditItem[];
}

export function RecentAuditsTable({ audits }: RecentAuditsTableProps) {
  const getStatusBadgeVariant = (status: AuditItem['status']) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'ONGOING': return 'info';
      case 'PLANNED': return 'warning';
      case 'CANCELLED': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent & Upcoming Audits</CardTitle>
      </CardHeader>
      <CardContent>
        {audits.length === 0 ? (
          <EmptyState
            icon={<CalendarClock className="h-6 w-6" />}
            title="No audits found"
            description="There are currently no recent or upcoming audits."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-medium">{audit.auditName}</TableCell>
                  <TableCell>{audit.department}</TableCell>
                  <TableCell>{audit.scheduledDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(audit.status)}>
                      {audit.status}
                    </Badge>
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
