import { useState, useEffect, useCallback } from 'react';
import type { GovernanceDashboardData } from '../types';
import { governanceService } from '../services/governance.service';

export function useGovernanceDashboard() {
  const [data, setData] = useState<GovernanceDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await governanceService.getDashboardData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch governance data'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}
