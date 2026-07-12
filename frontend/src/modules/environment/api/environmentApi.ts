import api from '../../../services/api';
import type {
  ApiResponse,
  CreateCarbonTransactionPayload,
  CreateSustainabilityGoalPayload,
  CarbonTransaction,
  EmissionFactor,
  EnvironmentDashboardData,
  SustainabilityGoal,
} from '../types';

const BASE = '/environment';

export const environmentApi = {
  getDashboard(): Promise<ApiResponse<EnvironmentDashboardData>> {
    return api.get(`${BASE}/dashboard`).then((res) => res.data);
  },

  getEmissionFactors(): Promise<ApiResponse<EmissionFactor[]>> {
    return api.get(`${BASE}/factors`).then((res) => res.data);
  },

  createCarbonTransaction(
    payload: CreateCarbonTransactionPayload
  ): Promise<ApiResponse<CarbonTransaction>> {
    return api.post(`${BASE}/transactions`, payload).then((res) => res.data);
  },

  createSustainabilityGoal(
    payload: CreateSustainabilityGoalPayload
  ): Promise<ApiResponse<SustainabilityGoal>> {
    return api.post(`${BASE}/goals`, payload).then((res) => res.data);
  },
};
