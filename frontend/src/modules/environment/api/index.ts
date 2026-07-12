import api from '../../../services/api';

export const environmentApi = {
  getDashboardData: async () => {
    const response = await api.get('/v2/environment/dashboard');
    return response.data;
  },
  getEmissionFactors: async () => {
    const response = await api.get('/v2/environment/emission-factors');
    return response.data;
  },
  createCarbonTransaction: async (data: any) => {
    const response = await api.post('/v2/environment/carbon-transactions', data);
    return response.data;
  },
  getSustainabilityGoals: async () => {
    const response = await api.get('/v2/environment/sustainability-goals');
    return response.data;
  },
};
