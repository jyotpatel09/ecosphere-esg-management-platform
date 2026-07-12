import api from '../../../services/api';
import type { GovernanceDashboardData } from '../types';

export const governanceService = {
  getDashboardData: async (): Promise<GovernanceDashboardData> => {
    const response = await api.get('/v2/governance/dashboard');
    return response.data.data;
  },
};
