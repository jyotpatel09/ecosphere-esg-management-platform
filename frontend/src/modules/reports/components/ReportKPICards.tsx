import React from 'react';
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import type { ReportDashboardSummary } from '../types/reportDashboard';
import { FileText, CheckCircle, Clock, Download, ArrowUpRight } from 'lucide-react';
=======
import { Card, CardContent } from '../../../shared/components/Card';
import type { ReportDashboardSummary } from '../types/reportDashboard';
import { FileText, CheckCircle, Clock, Download } from 'lucide-react';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

interface ReportKPICardsProps {
  summary: ReportDashboardSummary;
}

export function ReportKPICards({ summary }: ReportKPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Total Reports</CardTitle>
          <FileText className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight tabular-nums">{summary.totalReports}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-emerald-500">
            <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
            Active monitoring
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Generated</CardTitle>
          <Badge variant="success">Completed</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight tabular-nums">{summary.generatedReports}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-textSecondary">
            <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-500" />
            Ready for review
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Pending</CardTitle>
          <Badge variant="warning">{summary.pendingReports > 0 ? 'Action Needed' : 'Clear'}</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight tabular-nums">{summary.pendingReports}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Awaiting generation
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Total Exports</CardTitle>
          <Download className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-textPrimary tracking-tight tabular-nums">{summary.exportCount}</h3>
          </div>
          <div className="flex items-center mt-2 text-xs font-semibold text-textSecondary">
            Files downloaded
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
