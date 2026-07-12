import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import type {  AuditFinding, AuditFindingFormData  } from '../types/auditFinding';
=======
import type { AuditFinding, AuditFindingFormData } from '../types/auditFinding';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { auditFindingService } from '../services/auditFinding.service';

export function useAuditFindings() {
  const [findings, setFindings] = useState<AuditFinding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFindings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await auditFindingService.getFindings();
      setFindings(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch audit findings'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFindings();
  }, [fetchFindings]);

  const createFinding = async (data: AuditFindingFormData) => {
    const newFinding = await auditFindingService.createFinding(data);
    setFindings(prev => [newFinding, ...prev]);
    return newFinding;
  };

  const updateFinding = async (id: string, data: AuditFindingFormData) => {
    const updated = await auditFindingService.updateFinding(id, data);
    setFindings(prev => prev.map(f => (f.id === id ? updated : f)));
    return updated;
  };

  const deleteFinding = async (id: string) => {
    await auditFindingService.deleteFinding(id);
    setFindings(prev => prev.filter(f => f.id !== id));
  };

  return {
    findings,
    loading,
    error,
    createFinding,
    updateFinding,
    deleteFinding,
    refresh: fetchFindings,
  };
}
