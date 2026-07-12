import { useState, useEffect, useCallback } from 'react';
import type {  Audit, AuditFormData  } from '../types/audit';
import { auditService } from '../services/audit.service';

export function useAudits() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await auditService.getAudits();
      setAudits(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch audits'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  const createAudit = async (data: AuditFormData) => {
    const newAudit = await auditService.createAudit(data);
    setAudits(prev => [newAudit, ...prev]);
    return newAudit;
  };

  const updateAudit = async (id: string, data: AuditFormData) => {
    const updated = await auditService.updateAudit(id, data);
    setAudits(prev => prev.map(a => (a.id === id ? updated : a)));
    return updated;
  };

  const deleteAudit = async (id: string) => {
    await auditService.deleteAudit(id);
    setAudits(prev => prev.filter(a => a.id !== id));
  };

  return {
    audits,
    loading,
    error,
    createAudit,
    updateAudit,
    deleteAudit,
    refresh: fetchAudits,
  };
}
