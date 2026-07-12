import React from 'react';
import { CorrectiveAction } from '../types/correctiveAction';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { CorrectiveActionStatusBadge, CorrectiveActionPriorityBadge } from './CorrectiveActionStatusBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ClipboardCheck } from 'lucide-react';

interface CorrectiveActionTableProps {
  actions: CorrectiveAction[];
  onView: (action: CorrectiveAction) => void;
  onEdit: (action: CorrectiveAction) => void;
  onDelete: (action: CorrectiveAction) => void;
}

export function CorrectiveActionTable({ actions, onView, onEdit, onDelete }: CorrectiveActionTableProps) {
  if (actions.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardCheck className="h-8 w-8" />}
        title="No corrective actions found"
        description="Try adjusting your search or filters, or create a new action."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action Title</TableHead>
          <TableHead>Related Issue</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actions.map((action) => (
          <TableRow key={action.id}>
            <TableCell className="font-medium max-w-[200px] truncate" title={action.title}>
              {action.title}
            </TableCell>
            <TableCell className="max-w-[150px] truncate" title={action.relatedIssue}>
              {action.relatedIssue}
            </TableCell>
            <TableCell>{action.department}</TableCell>
            <TableCell>{action.assignedTo}</TableCell>
            <TableCell>
              <CorrectiveActionPriorityBadge priority={action.priority} />
            </TableCell>
            <TableCell>
              <CorrectiveActionStatusBadge status={action.status} />
            </TableCell>
            <TableCell>{action.dueDate}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(action)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(action)} title="Edit Action">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(action)} className="text-danger hover:text-red-700" title="Delete Action">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
