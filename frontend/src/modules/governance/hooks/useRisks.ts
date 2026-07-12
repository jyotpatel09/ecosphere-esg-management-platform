import { useState, useEffect, useCallback } from 'react';
import type {  Risk, RiskFormData  } from '../types/risk';
import { riskService } from '../services/risk.service';

export function useRisks() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRisks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await riskService.getRisks();
      setRisks(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch risks'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRisks();
  }, [fetchRisks]);

  const createRisk = async (data: RiskFormData) => {
    const newRisk = await riskService.createRisk(data);
    setRisks(prev => [newRisk, ...prev]);
    return newRisk;
  };

  const updateRisk = async (id: string, data: RiskFormData) => {
    const updated = await riskService.updateRisk(id, data);
    setRisks(prev => prev.map(r => (r.id === id ? updated : r)));
    return updated;
  };

  const deleteRisk = async (id: string) => {
    await riskService.deleteRisk(id);
    setRisks(prev => prev.filter(r => r.id !== id));
  };

  return {
    risks,
    loading,
    error,
    createRisk,
    updateRisk,
    deleteRisk,
    refresh: fetchRisks,
  };
}
