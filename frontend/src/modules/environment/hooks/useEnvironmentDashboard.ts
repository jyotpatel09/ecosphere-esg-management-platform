import { useEffect } from 'react';
import { useEnvironmentStore } from '../services/environmentStore';

export function useEnvironmentDashboard() {
  const {
    dashboardData,
    isDashboardLoading,
    dashboardError,
    fetchDashboard,
  } = useEnvironmentStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData,
    isDashboardLoading,
    dashboardError,
    refetch: fetchDashboard,
  };
}
