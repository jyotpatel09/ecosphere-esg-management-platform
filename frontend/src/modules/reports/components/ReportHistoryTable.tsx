import React from 'react';
import type { ReportHistoryEvent, ReportActionType } from '../types/reportHistory';
import { Badge } from '../../../shared/components/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { EmptyState } from '../../../shared/components/EmptyState';
import { History } from 'lucide-react';

interface ReportHistoryTableProps {
  history: ReportHistoryEvent[];
}

const actionTypeColors: Record<ReportActionType, 'default' | 'info' | 'success' | 'warning' | 'danger'> = {
  CREATED: 'success',
  UPDATED: 'info',
  DELETED: 'danger',
  STATUS_CHANGED: 'warning',
  REVIEWED: 'default',
  PUBLISHED: 'success',
};

export function ReportHistoryTable({ history }: ReportHistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={<History className="h-8 w-8" />}
          title="No history events found"
          description="There is no recorded history matching your criteria."
        />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Report Reference</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="whitespace-nowrap text-sm text-textSecondary">
              {new Date(event.timestamp).toLocaleString(undefined, { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {event.changedBy.charAt(0)}
                </div>
                <span className="font-medium text-textPrimary">{event.changedBy}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={actionTypeColors[event.actionType]}>
                {event.actionType.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell className="font-medium text-textPrimary">
              {event.reportTitle}
            </TableCell>
            <TableCell className="text-textSecondary max-w-md truncate">
              {event.details}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
