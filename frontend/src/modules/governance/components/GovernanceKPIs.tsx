import React from 'react';
import type { GovernanceKPIs as IGovernanceKPIs } from '../types';
import { Card, CardContent } from '../../../shared/components/Card';
import { FileText, AlertTriangle, CalendarClock, ShieldAlert } from 'lucide-react';

interface GovernanceKPIsProps {
  data: IGovernanceKPIs;
}

export function GovernanceKPIs({ data }: GovernanceKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-textSecondary">Total Policies</p>
              <h3 className="text-2xl font-bold text-textPrimary mt-2">{data.totalPolicies}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-textSecondary">Open Compliance Issues</p>
              <h3 className="text-2xl font-bold text-textPrimary mt-2">{data.openComplianceIssues}</h3>
            </div>
            <div className="p-3 rounded-full bg-warning/10 text-warning">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-textSecondary">Upcoming Audits</p>
              <h3 className="text-2xl font-bold text-textPrimary mt-2">{data.upcomingAudits}</h3>
            </div>
            <div className="p-3 rounded-full bg-secondary/10 text-secondary">
              <CalendarClock className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-textSecondary">High Risks</p>
              <h3 className="text-2xl font-bold text-textPrimary mt-2">{data.highRisks}</h3>
            </div>
            <div className="p-3 rounded-full bg-danger/10 text-danger">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
