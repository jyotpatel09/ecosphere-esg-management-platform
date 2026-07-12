import React from 'react';
<<<<<<< HEAD
import type {  Audit  } from '../types/audit';
=======
import type { Audit } from '../types/audit';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { AuditStatusBadge, AuditTypeBadge } from './AuditStatusBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { SearchCheck } from 'lucide-react';

interface AuditTableProps {
  audits: Audit[];
  onView: (audit: Audit) => void;
  onEdit: (audit: Audit) => void;
  onDelete: (audit: Audit) => void;
}

export function AuditTable({ audits, onView, onEdit, onDelete }: AuditTableProps) {
  if (audits.length === 0) {
    return (
      <EmptyState
        icon={<SearchCheck className="h-8 w-8" />}
        title="No audits found"
        description="Try adjusting your search or filters, or schedule a new audit."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Audit Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Auditor</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Scheduled Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Findings</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit) => (
          <TableRow key={audit.id}>
            <TableCell className="font-medium max-w-[200px] truncate" title={audit.auditName}>
              {audit.auditName}
            </TableCell>
            <TableCell>{audit.department}</TableCell>
            <TableCell>{audit.auditor}</TableCell>
            <TableCell>
              <AuditTypeBadge type={audit.auditType} />
            </TableCell>
            <TableCell>{audit.scheduledDate}</TableCell>
            <TableCell>
              <AuditStatusBadge status={audit.status} />
            </TableCell>
            <TableCell className="text-center">
              <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${audit.findingsCount > 0 ? 'bg-warning/20 text-warning' : 'bg-surfaceHighlight text-textSecondary'}`}>
                {audit.findingsCount}
              </span>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(audit)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(audit)} title="Edit Audit">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(audit)} className="text-danger hover:text-red-700" title="Delete Audit">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
