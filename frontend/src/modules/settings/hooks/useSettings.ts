import { useState, useEffect, useCallback } from 'react';
import { settingsApi } from '../api';
import { toast } from 'sonner';

export function useSettings() {
  const [preferences, setPreferences] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const prefData = await settingsApi.getPreferences();
      const userData = await settingsApi.getUsers();
      setPreferences(prefData);
      setUsers(userData);
    } catch (err: any) {
      toast.error('Failed to load settings data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePreferences = async (data: any) => {
    try {
      const updated = await settingsApi.updatePreferences(data);
      setPreferences(updated);
      toast.success('Preferences updated successfully');
    } catch (err) {
      toast.error('Failed to update preferences');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { preferences, users, isLoading, refetch: fetchSettings, updatePreferences };
}
