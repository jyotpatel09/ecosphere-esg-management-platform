import React from 'react';
import { Card, CardContent } from '../../../shared/components/Card';
import type { ReportDashboardSummary } from '../types/reportDashboard';
import { FileText, CheckCircle, Clock, Download } from 'lucide-react';

interface ReportKPICardsProps {
  summary: ReportDashboardSummary;
}

interface KPIItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
  bgColorClass: string;
  sub: string;
}

export function ReportKPICards({ summary }: ReportKPICardsProps) {
  const items: KPIItem[] = [
    {
      label: 'Total Reports',
      value: summary.totalReports,
      icon: <FileText className="h-5 w-5" />,
      colorClass: 'text-primary',
      bgColorClass: 'bg-primary/10',
      sub: 'across all departments',
    },
    {
      label: 'Generated',
      value: summary.generatedReports,
      icon: <CheckCircle className="h-5 w-5" />,
      colorClass: 'text-success',
      bgColorClass: 'bg-success/10',
      sub: 'reports completed',
    },
    {
      label: 'Pending',
      value: summary.pendingReports,
      icon: <Clock className="h-5 w-5" />,
      colorClass: 'text-warning',
      bgColorClass: 'bg-warning/10',
      sub: 'awaiting generation',
    },
    {
      label: 'Total Exports',
      value: summary.exportCount,
      icon: <Download className="h-5 w-5" />,
      colorClass: 'text-info',
      bgColorClass: 'bg-info/10',
      sub: 'files downloaded',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-textSecondary truncate">{item.label}</p>
                <h3 className="text-3xl font-bold text-textPrimary mt-2 tabular-nums">{item.value}</h3>
                <p className="text-xs text-textSecondary mt-2">{item.sub}</p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColorClass} ${item.colorClass} shrink-0 ml-4`}>
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
