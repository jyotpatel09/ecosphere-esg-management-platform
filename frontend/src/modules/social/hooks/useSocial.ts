import { useState, useEffect, useCallback } from 'react';
import { socialApi } from '../api';
import type { CSRActivity, SocialKPI } from '../types';
import { toast } from 'sonner';

export function useSocial() {
  const [activities, setActivities] = useState<CSRActivity[]>([]);
  const [kpis, setKpis] = useState<SocialKPI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await socialApi.getActivities();
      setActivities(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch activities');
      toast.error('Failed to load CSR activities');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchKPIs = useCallback(async () => {
    try {
      const data = await socialApi.getKPIs();
      setKpis(data);
    } catch (err: any) {
      console.error('Failed to load KPIs', err);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
    fetchKPIs();
  }, [fetchActivities, fetchKPIs]);

  const deleteActivity = async (id: string) => {
    try {
      await socialApi.deleteActivity(id);
      toast.success('Activity deleted');
      fetchActivities(); // refresh
    } catch (err) {
      toast.error('Failed to delete activity');
    }
  };

  return {
    activities,
    kpis,
    isLoading,
    error,
    refetch: fetchActivities,
    deleteActivity
  };
}
