<<<<<<< HEAD
import api from '../../../services/api';
import type { GovernanceDashboardData } from '../types';
=======
import type { GovernanceDashboardData } from '../types';
import { mockGovernanceData } from '../constants/mockGovernanceData';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export const governanceService = {
  getDashboardData: async (): Promise<GovernanceDashboardData> => {
    const response = await api.get('/v2/governance/dashboard');
    return response.data.data;
  },
};
