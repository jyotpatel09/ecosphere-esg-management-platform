import { useState, useEffect, useCallback } from 'react';
import { gamificationApi } from '../api';
import { toast } from 'sonner';

export function useGamification() {
  const [data, setData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const dashboardData = await gamificationApi.getDashboardData();
      const leaderboardData = await gamificationApi.getLeaderboard();
      setData(dashboardData);
      setLeaderboard(leaderboardData);
    } catch (err: any) {
      toast.error('Failed to load gamification data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, leaderboard, isLoading, refetch: fetchDashboard };
}
