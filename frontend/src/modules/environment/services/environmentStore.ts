import { create } from 'zustand';
import { environmentApi } from '../api/environmentApi';
import type {
  CarbonTransaction,
  EmissionFactor,
  EnvironmentDashboardData,
  SustainabilityGoal,
  CreateCarbonTransactionPayload,
  CreateSustainabilityGoalPayload,
} from '../types';

interface EnvironmentState {
  // Data
  dashboardData: EnvironmentDashboardData | null;
  emissionFactors: EmissionFactor[];

  // Loading states
  isDashboardLoading: boolean;
  isFactorsLoading: boolean;
  isCreatingTransaction: boolean;
  isCreatingGoal: boolean;

  // Error states
  dashboardError: string | null;
  factorsError: string | null;
  transactionError: string | null;
  goalError: string | null;

  // Actions
  fetchDashboard: () => Promise<void>;
  fetchEmissionFactors: () => Promise<void>;
  createTransaction: (payload: CreateCarbonTransactionPayload) => Promise<CarbonTransaction | null>;
  createGoal: (payload: CreateSustainabilityGoalPayload) => Promise<SustainabilityGoal | null>;
  clearErrors: () => void;
}

export const useEnvironmentStore = create<EnvironmentState>()((set) => ({
  // Initial data
  dashboardData: null,
  emissionFactors: [],

  // Initial loading states
  isDashboardLoading: false,
  isFactorsLoading: false,
  isCreatingTransaction: false,
  isCreatingGoal: false,

  // Initial error states
  dashboardError: null,
  factorsError: null,
  transactionError: null,
  goalError: null,

  fetchDashboard: async () => {
    set({ isDashboardLoading: true, dashboardError: null });
    try {
      const response = await environmentApi.getDashboard();
      set({ dashboardData: response.data, isDashboardLoading: false });
    } catch (error: any) {
      set({
        dashboardError: error?.response?.data?.error ?? 'Failed to load dashboard data.',
        isDashboardLoading: false,
      });
    }
  },

  fetchEmissionFactors: async () => {
    set({ isFactorsLoading: true, factorsError: null });
    try {
      const response = await environmentApi.getEmissionFactors();
      set({ emissionFactors: response.data, isFactorsLoading: false });
    } catch (error: any) {
      set({
        factorsError: error?.response?.data?.error ?? 'Failed to load emission factors.',
        isFactorsLoading: false,
      });
    }
  },

  createTransaction: async (payload) => {
    set({ isCreatingTransaction: true, transactionError: null });
    try {
      const response = await environmentApi.createCarbonTransaction(payload);
      set({ isCreatingTransaction: false });
      return response.data;
    } catch (error: any) {
      set({
        transactionError: error?.response?.data?.error ?? 'Failed to create transaction.',
        isCreatingTransaction: false,
      });
      return null;
    }
  },

  createGoal: async (payload) => {
    set({ isCreatingGoal: true, goalError: null });
    try {
      const response = await environmentApi.createSustainabilityGoal(payload);
      set({ isCreatingGoal: false });
      return response.data;
    } catch (error: any) {
      set({
        goalError: error?.response?.data?.error ?? 'Failed to create sustainability goal.',
        isCreatingGoal: false,
      });
      return null;
    }
  },

  clearErrors: () =>
    set({
      dashboardError: null,
      factorsError: null,
      transactionError: null,
      goalError: null,
    }),
}));
