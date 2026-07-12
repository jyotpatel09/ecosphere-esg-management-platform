<<<<<<< HEAD
import api from '../../../services/api';
import type { ReportDashboardData } from '../types/reportDashboard';
=======
import type { ReportDashboardData } from '../types/reportDashboard';
import { mockReportDashboardData } from '../constants/mockReportDashboard';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70

export const reportDashboardService = {
  getDashboardData: async (): Promise<ReportDashboardData> => {
    const response = await api.get('/v2/reports/dashboard');
    return response.data.data;
  },
};
