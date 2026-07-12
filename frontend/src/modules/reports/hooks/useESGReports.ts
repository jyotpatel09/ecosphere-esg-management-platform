import { useState, useEffect, useCallback } from 'react';
import { ESGReport, ESGReportFormData } from '../types/esgReport';
import { esgReportService } from '../services/esgReport.service';

export function useESGReports() {
  const [reports, setReports] = useState<ESGReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await esgReportService.getReports();
      setReports(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch ESG reports'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const createReport = async (data: ESGReportFormData) => {
    const newReport = await esgReportService.createReport(data);
    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const updateReport = async (id: string, data: ESGReportFormData) => {
    const updated = await esgReportService.updateReport(id, data);
    setReports(prev => prev.map(r => (r.id === id ? updated : r)));
    return updated;
  };

  const deleteReport = async (id: string) => {
    await esgReportService.deleteReport(id);
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    deleteReport,
    refresh: fetchReports,
  };
}
