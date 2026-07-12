import React from 'react';
import { useGovernanceKPIs } from '../hooks/useGovernanceKPIs';
import { KPICard } from '../components/KPICard';
import { ComplianceTrendChart } from '../components/ComplianceTrendChart';
import { RiskDistributionChart } from '../components/RiskDistributionChart';
import { AuditPerformanceChart } from '../components/AuditPerformanceChart';
import { Skeleton } from '../../../shared/components/SkeletonLoader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Button } from '../../../shared/components/Button';
import { Card, CardContent } from '../../../shared/components/Card';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  ShieldAlert,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

function KPISkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChartSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className={i === 0 ? 'lg:col-span-2' : ''}>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function GovernanceKPIsPage() {
  const { data, loading, error, refresh } = useGovernanceKPIs();

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <KPISkeletonGrid />
        <ChartSkeletonGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<ShieldAlert className="h-8 w-8" />}
          title="Failed to load analytics"
          description={error.message || 'An error occurred while fetching KPI data.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<BarChart3 className="h-8 w-8" />}
          title="No analytics data available"
          description="Governance analytics will appear here once data is collected."
          action={<Button variant="primary" onClick={refresh}>Refresh</Button>}
        />
      </div>
    );
  }

  const { summary, complianceTrend, riskDistribution, auditPerformance } = data;

  const complianceRate =
    summary.complianceIssues + summary.resolvedIssues > 0
      ? Math.round((summary.resolvedIssues / (summary.complianceIssues + summary.resolvedIssues)) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">KPIs & Analytics</h1>
          <p className="text-textSecondary mt-1">Management-level insights into governance performance.</p>
        </div>
        <Button variant="ghost" className="gap-2 self-start sm:self-auto" onClick={refresh}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Overall Governance Score */}
      <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-surface to-surface p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-textSecondary">Overall Governance Score</p>
          <p className="text-5xl font-black text-primary mt-1 tabular-nums">
            {summary.overallGovernanceScore}
            <span className="text-2xl font-medium text-textSecondary ml-1">/ 100</span>
          </p>
          <p className="text-sm text-textSecondary mt-2">
            Based on policy compliance, audit completion, and risk mitigation.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-primary/40 bg-primary/10 shrink-0">
          <span className="text-3xl font-black text-primary tabular-nums">{summary.overallGovernanceScore}%</span>
          <span className="text-xs text-textSecondary mt-1">Score</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          label="Total Policies"
          value={summary.totalPolicies}
          icon={<FileText className="h-5 w-5" />}
          colorClass="text-primary"
          bgColorClass="bg-primary/10"
          trend={{ direction: 'neutral', label: `${summary.activePolicies} active` }}
        />
        <KPICard
          label="Compliance Rate"
          value={complianceRate}
          suffix="%"
          icon={<ShieldCheck className="h-5 w-5" />}
          colorClass="text-success"
          bgColorClass="bg-success/10"
          trend={{ direction: 'up', label: `${summary.resolvedIssues} resolved` }}
        />
        <KPICard
          label="Open Issues"
          value={summary.complianceIssues}
          icon={<AlertTriangle className="h-5 w-5" />}
          colorClass="text-warning"
          bgColorClass="bg-warning/10"
          trend={{ direction: summary.complianceIssues > 5 ? 'down' : 'neutral', label: 'compliance issues' }}
        />
        <KPICard
          label="Completed Audits"
          value={summary.completedAudits}
          icon={<ClipboardCheck className="h-5 w-5" />}
          colorClass="text-info"
          bgColorClass="bg-info/10"
          trend={{ direction: 'up', label: `${summary.openAuditFindings} open findings` }}
        />
        <KPICard
          label="Critical Risks"
          value={summary.criticalRisks}
          icon={<ShieldAlert className="h-5 w-5" />}
          colorClass="text-danger"
          bgColorClass="bg-danger/10"
          trend={{ direction: summary.criticalRisks > 0 ? 'down' : 'neutral', label: 'need mitigation' }}
        />
        <KPICard
          label="Pending Actions"
          value={summary.pendingCorrectiveActions}
          icon={<BarChart3 className="h-5 w-5" />}
          colorClass="text-secondary"
          bgColorClass="bg-secondary/10"
          trend={{ direction: 'neutral', label: 'corrective actions' }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Full-width compliance trend */}
        <div className="lg:col-span-2">
          <ComplianceTrendChart data={complianceTrend} />
        </div>

        {/* Risk Distribution */}
        <RiskDistributionChart data={riskDistribution} />

        {/* Audit Performance */}
        <AuditPerformanceChart data={auditPerformance} />
      </div>
    </div>
  );
}
