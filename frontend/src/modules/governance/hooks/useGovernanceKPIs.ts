import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import type {  GovernanceKPIData  } from '../types/governanceKPI';
=======
import type { GovernanceKPIData } from '../types/governanceKPI';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { governanceKPIService } from '../services/governanceKPI.service';

export function useGovernanceKPIs() {
  const [data, setData] = useState<GovernanceKPIData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchKPIs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await governanceKPIService.getKPIData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch governance KPI data'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  return {
    data,
    loading,
    error,
    refresh: fetchKPIs,
  };
}
