import { useState, useEffect, useCallback } from 'react';
import type {  Policy, PolicyFormData  } from '../types/policy';
import { policyService } from '../services/policy.service';

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await policyService.getPolicies();
      setPolicies(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch policies'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const createPolicy = async (data: PolicyFormData) => {
    const newPolicy = await policyService.createPolicy(data);
    setPolicies(prev => [newPolicy, ...prev]);
    return newPolicy;
  };

  const updatePolicy = async (id: string, data: PolicyFormData) => {
    const updated = await policyService.updatePolicy(id, data);
    setPolicies(prev => prev.map(p => (p.id === id ? updated : p)));
    return updated;
  };

  const deletePolicy = async (id: string) => {
    await policyService.deletePolicy(id);
    setPolicies(prev => prev.filter(p => p.id !== id));
  };

  return {
    policies,
    loading,
    error,
    createPolicy,
    updatePolicy,
    deletePolicy,
    refresh: fetchPolicies,
  };
}
