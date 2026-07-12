import React from 'react';
import type { GovernanceKPIs as IGovernanceKPIs } from '../types';
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { FileText, AlertTriangle, CalendarClock, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';
=======
import { Card, CardContent } from '../../../shared/components/Card';
import { FileText, AlertTriangle, CalendarClock, ShieldAlert } from 'lucide-react';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

interface GovernanceKPIsProps {
  data: IGovernanceKPIs;
}

export function GovernanceKPIs({ data }: GovernanceKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Total Policies</CardTitle>
          <FileText className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight">{data.totalPolicies}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-emerald-500">
            <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
            +2 this month
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Open Compliance Issues</CardTitle>
          <Badge variant="warning">{data.openComplianceIssues} Active</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight">{data.openComplianceIssues}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-amber-500">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Action required
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Upcoming Audits</CardTitle>
          <CalendarClock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight">{data.upcomingAudits}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-textSecondary">
            Next audit in 14 days
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">High Risks</CardTitle>
          <Badge variant="danger">Critical</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight">{data.highRisks}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-rose-500">
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            Immediate review needed
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
