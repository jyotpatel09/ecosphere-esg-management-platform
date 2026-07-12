import React from 'react';
import { useReportDashboard } from '../hooks/useReportDashboard';
import { ReportKPICards } from '../components/ReportKPICards';
import { ReportTrendChart } from '../components/ReportTrendChart';
import { DepartmentReportChart } from '../components/DepartmentReportChart';
import { RecentReportsTable } from '../components/RecentReportsTable';
import { Skeleton } from '../../../shared/components/SkeletonLoader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Button } from '../../../shared/components/Button';
import { Card, CardContent } from '../../../shared/components/Card';
import { BarChart3, RefreshCw, ShieldAlert, Plus, Download } from 'lucide-react';

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-60 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6 space-y-3">
          <Skeleton className="h-5 w-48" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function ReportsDashboard() {
  const { data, loading, error, refresh } = useReportDashboard();

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<ShieldAlert className="h-8 w-8" />}
          title="Failed to load reports dashboard"
          description={error.message || 'An error occurred while fetching report data.'}
          action={<Button onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<BarChart3 className="h-8 w-8" />}
          title="No reporting data available"
          description="Reports overview will appear here once data is collected."
          action={<Button onClick={refresh}>Refresh</Button>}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Reporting & Analytics</h1>
          <p className="text-sm text-textSecondary mt-1">Comprehensive ESG reporting, compliance documentation, and analytics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="h-4 w-4 mr-2" /> 
            Refresh Data
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4 mr-1.5" /> 
            New Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <ReportKPICards summary={data.summary} />

      {/* Charts & Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="xl:col-span-2 flex flex-col space-y-6">
          <ReportTrendChart data={data.trend} />
          <div className="flex-1">
            <RecentReportsTable reports={data.recentReports} />
          </div>
        </div>
        <div className="xl:col-span-1">
          <DepartmentReportChart data={data.departmentDistribution} />
        </div>
      </div>
    </div>
  );
}
