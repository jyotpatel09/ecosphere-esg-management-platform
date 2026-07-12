import React from 'react';
import { Policy } from '../types/policy';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { PolicyStatusBadge } from './PolicyStatusBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { FileText } from 'lucide-react';

interface PolicyTableProps {
  policies: Policy[];
  onView: (policy: Policy) => void;
  onEdit: (policy: Policy) => void;
  onDelete: (policy: Policy) => void;
}

export function PolicyTable({ policies, onView, onEdit, onDelete }: PolicyTableProps) {
  if (policies.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="No policies found"
        description="Try adjusting your search or filters, or create a new policy."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Policy Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies.map((policy) => (
          <TableRow key={policy.id}>
            <TableCell className="font-medium">{policy.title}</TableCell>
            <TableCell>{policy.category}</TableCell>
            <TableCell>{policy.owner}</TableCell>
            <TableCell>{policy.department}</TableCell>
            <TableCell>
              <PolicyStatusBadge status={policy.status} />
            </TableCell>
            <TableCell>{policy.lastUpdated}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(policy)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(policy)} title="Edit Policy">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(policy)} className="text-danger hover:text-red-700" title="Delete Policy">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
