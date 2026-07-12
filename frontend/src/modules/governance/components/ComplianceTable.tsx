import React from 'react';
<<<<<<< HEAD
import type {  ComplianceIssue  } from '../types/compliance';
=======
import type { ComplianceIssue } from '../types/compliance';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { ComplianceStatusBadge, ComplianceSeverityBadge } from './ComplianceStatusBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ShieldAlert } from 'lucide-react';

interface ComplianceTableProps {
  issues: ComplianceIssue[];
  onView: (issue: ComplianceIssue) => void;
  onEdit: (issue: ComplianceIssue) => void;
  onDelete: (issue: ComplianceIssue) => void;
}

export function ComplianceTable({ issues, onView, onEdit, onDelete }: ComplianceTableProps) {
  if (issues.length === 0) {
    return (
      <EmptyState
        icon={<ShieldAlert className="h-8 w-8" />}
        title="No compliance issues found"
        description="Try adjusting your search or filters, or log a new issue."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Issue Title</TableHead>
          <TableHead>Policy</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned Person</TableHead>
          <TableHead>Created Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium max-w-[200px] truncate" title={issue.title}>
              {issue.title}
            </TableCell>
            <TableCell className="max-w-[150px] truncate" title={issue.policy}>
              {issue.policy}
            </TableCell>
            <TableCell>{issue.department}</TableCell>
            <TableCell>
              <ComplianceSeverityBadge severity={issue.severity} />
            </TableCell>
            <TableCell>
              <ComplianceStatusBadge status={issue.status} />
            </TableCell>
            <TableCell>{issue.assignee}</TableCell>
            <TableCell>{issue.createdAt}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(issue)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(issue)} title="Edit Issue">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(issue)} className="text-danger hover:text-red-700" title="Delete Issue">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
