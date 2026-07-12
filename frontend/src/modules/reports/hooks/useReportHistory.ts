import { useState, useEffect, useCallback } from 'react';
import type { ReportHistoryEvent } from '../types/reportHistory';
import { reportHistoryService } from '../services/reportHistory.service';

export function useReportHistory(reportId?: string) {
  const [history, setHistory] = useState<ReportHistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportHistoryService.getHistory(reportId);
      setHistory(data);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Failed to fetch report history'));
    } finally {
      setLoading(false);
    }
  }, [reportId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const logEvent = async (event: Omit<ReportHistoryEvent, 'id' | 'timestamp'>) => {
    const newEvent = await reportHistoryService.logEvent(event);
    setHistory(prev => [newEvent, ...prev]);
    return newEvent;
  };

  return {
    history,
    loading,
    error,
    refresh: fetchHistory,
    logEvent
  };
}
