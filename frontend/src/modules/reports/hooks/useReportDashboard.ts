import { useState, useEffect, useCallback } from 'react';
import { ReportDashboardData } from '../types/reportDashboard';
import { reportDashboardService } from '../services/reportDashboard.service';

export function useReportDashboard() {
  const [data, setData] = useState<ReportDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await reportDashboardService.getDashboardData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reports dashboard data'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboard,
  };
}
