import type { ReportDashboardData } from '../types/reportDashboard';
import { mockReportDashboardData } from '../constants/mockReportDashboard';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const reportDashboardService = {
  getDashboardData: async (): Promise<ReportDashboardData> => {
    await delay(700);
    return { ...mockReportDashboardData };
  },
};
