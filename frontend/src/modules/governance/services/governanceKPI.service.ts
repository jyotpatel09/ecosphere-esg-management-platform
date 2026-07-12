import { GovernanceKPIData } from '../types/governanceKPI';
import { mockGovernanceKPIData } from '../constants/mockGovernanceKPIs';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const governanceKPIService = {
  getKPIData: async (): Promise<GovernanceKPIData> => {
    await delay(700);
    return { ...mockGovernanceKPIData };
  },
};
