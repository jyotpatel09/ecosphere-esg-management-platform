import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import type {  CorrectiveAction, CorrectiveActionFormData  } from '../types/correctiveAction';
=======
import type { CorrectiveAction, CorrectiveActionFormData } from '../types/correctiveAction';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { correctiveActionService } from '../services/correctiveAction.service';

export function useCorrectiveActions() {
  const [correctiveActions, setCorrectiveActions] = useState<CorrectiveAction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await correctiveActionService.getActions();
      setCorrectiveActions(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch corrective actions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  const createAction = async (data: CorrectiveActionFormData) => {
    const newAction = await correctiveActionService.createAction(data);
    setCorrectiveActions(prev => [newAction, ...prev]);
    return newAction;
  };

  const updateAction = async (id: string, data: CorrectiveActionFormData) => {
    const updated = await correctiveActionService.updateAction(id, data);
    setCorrectiveActions(prev => prev.map(a => (a.id === id ? updated : a)));
    return updated;
  };

  const deleteAction = async (id: string) => {
    await correctiveActionService.deleteAction(id);
    setCorrectiveActions(prev => prev.filter(a => a.id !== id));
  };

  return {
    correctiveActions,
    loading,
    error,
    createAction,
    updateAction,
    deleteAction,
    refresh: fetchActions,
  };
}
