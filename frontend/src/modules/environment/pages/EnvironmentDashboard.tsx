import React from 'react';
import { AlertCircle, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Skeleton } from '../../../shared/components/SkeletonLoader';
import { useEnvironmentDashboard } from '../hooks/useEnvironmentDashboard';
import type { SustainabilityGoal, CarbonTransaction } from '../types';

function getStatusBadge(status: SustainabilityGoal['status']) {
  switch (status) {
    case 'ON_TRACK':  return <Badge variant="success">On Track</Badge>;
    case 'AT_RISK':   return <Badge variant="warning">At Risk</Badge>;
    case 'ACHIEVED':  return <Badge variant="info">Achieved</Badge>;
    default:          return <Badge>{status}</Badge>;
  }
}

function formatCO2e(value: number): string {
  return value >= 1000
    ? `${(value / 1000).toFixed(2)} tCO2e`
    : `${value.toFixed(2)} kgCO2e`;
}

export function EnvironmentDashboard() {
  const { dashboardData, isDashboardLoading, dashboardError, refetch } = useEnvironmentDashboard();

  if (isDashboardLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-textPrimary">Environmental Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-3/4 mb-3" />
                <Skeleton className="h-8 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-textPrimary">Environmental Dashboard</h1>
        <EmptyState
          icon={<AlertCircle className="h-6 w-6" />}
          title="Failed to load dashboard data"
          description={dashboardError}
          action={
            <button
              onClick={refetch}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          }
        />
      </div>
    );
  }

  const metrics = dashboardData?.metrics;
  const transactions: CarbonTransaction[] = dashboardData?.transactions ?? [];
  const goals: SustainabilityGoal[] = dashboardData?.goals ?? [];

  const kpis = [
    { title: 'Total Emissions', value: formatCO2e(metrics?.totalEmissions ?? 0) },
    { title: 'Scope 1 Emissions', value: formatCO2e(metrics?.scope1 ?? 0) },
    { title: 'Scope 2 Emissions', value: formatCO2e(metrics?.scope2 ?? 0) },
    { title: 'Scope 3 Emissions', value: formatCO2e(metrics?.scope3 ?? 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-textPrimary">Environmental Dashboard</h1>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-textSecondary">
                {kpi.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textPrimary">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Transactions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Carbon Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <EmptyState
                icon={<Leaf className="h-5 w-5" />}
                title="No transactions yet"
                description="Carbon transactions will appear here once recorded."
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">CO2e</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">
                        {new Date(tx.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{tx.emissionFactor?.source ?? '—'}</TableCell>
                      <TableCell>{tx.department?.name ?? '—'}</TableCell>
                      <TableCell className="text-right">{formatCO2e(tx.calculatedCO2e)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Sustainability Goals */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sustainability Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <EmptyState
                icon={<Leaf className="h-5 w-5" />}
                title="No goals defined"
                description="Sustainability goals will appear here once created."
              />
            ) : (
              <div className="space-y-6">
                {goals.map((goal) => {
                  const progress = goal.targetValue > 0
                    ? Math.min(100, (goal.currentValue / goal.targetValue) * 100)
                    : 0;
                  return (
                    <div key={goal.id} className="flex items-start justify-between space-x-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none text-textPrimary">{goal.title}</p>
                        <p className="text-sm text-textSecondary">
                          {goal.currentValue} / {goal.targetValue} {goal.metric}
                        </p>
                        <div className="mt-2 h-2 w-full rounded-full bg-surfaceHighlight overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(goal.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
