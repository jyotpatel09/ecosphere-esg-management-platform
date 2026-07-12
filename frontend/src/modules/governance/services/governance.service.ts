import { GovernanceDashboardData } from '../types';
import { mockGovernanceData } from '../constants/mockGovernanceData';

export const governanceService = {
  getDashboardData: async (): Promise<GovernanceDashboardData> => {
    // Simulate network delay for realistic loading states
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGovernanceData);
      }, 800);
    });
  },
};
