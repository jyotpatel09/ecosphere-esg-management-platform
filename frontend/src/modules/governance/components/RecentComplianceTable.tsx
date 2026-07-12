import React from 'react';
import type { ComplianceIssueItem } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { EmptyState } from '../../../shared/components/EmptyState';
import { AlertTriangle } from 'lucide-react';

interface RecentComplianceTableProps {
  issues: ComplianceIssueItem[];
}

export function RecentComplianceTable({ issues }: RecentComplianceTableProps) {
  const getSeverityBadgeVariant = (severity: ComplianceIssueItem['severity']) => {
    switch (severity) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'info';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const getStatusBadgeVariant = (status: ComplianceIssueItem['status']) => {
    switch (status) {
      case 'OPEN': return 'danger';
      case 'INVESTIGATING': return 'warning';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Compliance Issues</CardTitle>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <EmptyState
            icon={<AlertTriangle className="h-6 w-6" />}
            title="No compliance issues"
            description="Great job! There are no open compliance issues."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.issue}</TableCell>
                  <TableCell>{issue.department}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(issue.severity)}>
                      {issue.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(issue.status)}>
                      {issue.status}
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
