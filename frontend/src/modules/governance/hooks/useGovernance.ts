import { useState, useEffect, useCallback } from 'react';
import { governanceApi } from '../api';
import { toast } from 'sonner';

export function useGovernance() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const dashboardData = await governanceApi.getDashboardData();
      setData(dashboardData);
    } catch (err: any) {
      toast.error('Failed to load governance data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, isLoading, refetch: fetchDashboard };
}
