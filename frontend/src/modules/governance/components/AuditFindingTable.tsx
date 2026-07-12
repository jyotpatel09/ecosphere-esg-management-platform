import React from 'react';
<<<<<<< HEAD
import type {  AuditFinding  } from '../types/auditFinding';
=======
import type { AuditFinding } from '../types/auditFinding';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { AuditFindingSeverityBadge, AuditFindingStatusBadge } from './AuditFindingSeverityBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ClipboardList } from 'lucide-react';

interface AuditFindingTableProps {
  findings: AuditFinding[];
  onView: (finding: AuditFinding) => void;
  onEdit: (finding: AuditFinding) => void;
  onDelete: (finding: AuditFinding) => void;
}

export function AuditFindingTable({ findings, onView, onEdit, onDelete }: AuditFindingTableProps) {
  if (findings.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardList className="h-8 w-8" />}
        title="No audit findings"
        description="Try adjusting your search or filters, or document a new finding."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Finding Title</TableHead>
          <TableHead>Audit</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {findings.map((finding) => (
          <TableRow key={finding.id}>
            <TableCell className="font-medium max-w-[200px] truncate" title={finding.title}>
              {finding.title}
            </TableCell>
            <TableCell className="max-w-[150px] truncate" title={finding.auditName}>
              {finding.auditName}
            </TableCell>
            <TableCell>{finding.department}</TableCell>
            <TableCell>
              <AuditFindingSeverityBadge severity={finding.severity} />
            </TableCell>
            <TableCell>
              <AuditFindingStatusBadge status={finding.status} />
            </TableCell>
            <TableCell>{finding.assignedTo}</TableCell>
            <TableCell>{finding.dueDate}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(finding)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(finding)} title="Edit Finding">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(finding)} className="text-danger hover:text-red-700" title="Delete Finding">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
