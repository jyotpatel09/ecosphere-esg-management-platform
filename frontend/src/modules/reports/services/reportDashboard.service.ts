import api from '../../../services/api';
import type { ReportDashboardData } from '../types/reportDashboard';

export const reportDashboardService = {
  getDashboardData: async (): Promise<ReportDashboardData> => {
    const response = await api.get('/v2/reports/dashboard');
    return response.data.data;
  },
};
