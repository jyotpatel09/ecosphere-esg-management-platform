import React from 'react';
import type { Risk } from '../types/risk';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { RiskSeverityBadge, RiskStatusBadge } from './RiskSeverityBadge';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { EmptyState } from '../../../shared/components/EmptyState';
import { AlertTriangle } from 'lucide-react';

interface RiskTableProps {
  risks: Risk[];
  onView: (risk: Risk) => void;
  onEdit: (risk: Risk) => void;
  onDelete: (risk: Risk) => void;
}

export function RiskTable({ risks, onView, onEdit, onDelete }: RiskTableProps) {
  if (risks.length === 0) {
    return (
      <EmptyState
        icon={<AlertTriangle className="h-8 w-8" />}
        title="No risks found"
        description="Try adjusting your search or filters, or log a new risk."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Risk Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead className="text-center">Risk Score</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {risks.map((risk) => (
          <TableRow key={risk.id}>
            <TableCell className="font-medium max-w-[200px] truncate" title={risk.title}>
              {risk.title}
            </TableCell>
            <TableCell>{risk.category}</TableCell>
            <TableCell>{risk.department}</TableCell>
            <TableCell>{risk.owner}</TableCell>
            <TableCell>
              <RiskSeverityBadge severity={risk.severity} />
            </TableCell>
            <TableCell className="text-center">
              <span className="font-semibold text-textSecondary">{risk.riskScore}</span>
            </TableCell>
            <TableCell>
              <RiskStatusBadge status={risk.status} />
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onView(risk)} title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(risk)} title="Edit Risk">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(risk)} className="text-danger hover:text-red-700" title="Delete Risk">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
