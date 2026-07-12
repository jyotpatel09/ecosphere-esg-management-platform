import React from 'react';
import { useGovernanceDashboard } from '../hooks/useGovernanceDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { GovernanceKPIs } from '../components/GovernanceKPIs';
import { RecentAuditsTable } from '../components/RecentAuditsTable';
import { RecentComplianceTable } from '../components/RecentComplianceTable';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Button } from '../../../shared/components/Button';
import { ShieldAlert } from 'lucide-react';

export function GovernanceDashboard() {
  const { data, loading, error, refresh } = useGovernanceDashboard();

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<ShieldAlert className="h-8 w-8" />}
          title="Failed to load dashboard"
          description={error.message || 'An error occurred while fetching governance data.'}
          action={
            <Button variant="primary" onClick={refresh}>
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          title="No data available"
          description="There is no governance data to display at the moment."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <GovernanceKPIs data={data.kpis} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAuditsTable audits={data.recentAudits} />
        <RecentComplianceTable issues={data.recentComplianceIssues} />
      </div>
    </div>
  );
}
