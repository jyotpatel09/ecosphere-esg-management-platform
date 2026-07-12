import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import type {  ComplianceIssue, ComplianceFormData  } from '../types/compliance';
=======
import type { ComplianceIssue, ComplianceFormData } from '../types/compliance';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { complianceService } from '../services/compliance.service';

export function useComplianceIssues() {
  const [complianceIssues, setComplianceIssues] = useState<ComplianceIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await complianceService.getComplianceIssues();
      setComplianceIssues(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch compliance issues'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const createIssue = async (data: ComplianceFormData) => {
    const newIssue = await complianceService.createIssue(data);
    setComplianceIssues(prev => [newIssue, ...prev]);
    return newIssue;
  };

  const updateIssue = async (id: string, data: ComplianceFormData) => {
    const updated = await complianceService.updateIssue(id, data);
    setComplianceIssues(prev => prev.map(i => (i.id === id ? updated : i)));
    return updated;
  };

  const deleteIssue = async (id: string) => {
    await complianceService.deleteIssue(id);
    setComplianceIssues(prev => prev.filter(i => i.id !== id));
  };

  return {
    complianceIssues,
    loading,
    error,
    createIssue,
    updateIssue,
    deleteIssue,
    refresh: fetchIssues,
  };
}
