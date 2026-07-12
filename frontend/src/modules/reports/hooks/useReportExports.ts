import { useState, useEffect, useCallback } from 'react';
import type { ReportExport, ReportExportFormData, ReportExportStatus } from '../types/reportExport';
import { reportExportService } from '../services/reportExport.service';

export function useReportExports() {
  const [exports, setExports] = useState<ReportExport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportExportService.getExports();
      setExports(data);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Failed to fetch report exports'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExports();
  }, [fetchExports]);

  const createExport = async (data: ReportExportFormData) => {
    const newExport = await reportExportService.createExport(data);
    setExports(prev => [newExport, ...prev]);
    return newExport;
  };

  const updateExportStatus = async (id: string, status: ReportExportStatus) => {
    const updated = await reportExportService.updateExportStatus(id, status);
    setExports(prev => prev.map(e => e.id === id ? updated : e));
    return updated;
  };

  const deleteExport = async (id: string) => {
    await reportExportService.deleteExport(id);
    setExports(prev => prev.filter(e => e.id !== id));
  };

  return {
    exports,
    loading,
    error,
    refresh: fetchExports,
    createExport,
    updateExportStatus,
    deleteExport
  };
}
