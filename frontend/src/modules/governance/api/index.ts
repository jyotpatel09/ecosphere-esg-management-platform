import api from '../../../services/api';

export const governanceApi = {
  getDashboardData: async () => {
    const response = await api.get('/v2/governance/dashboard');
    return response.data.data;
  },
  getPolicies: async () => {
    const response = await api.get('/v2/governance/policies');
    return response.data.data;
  },
  getComplianceIssues: async () => {
    const response = await api.get('/v2/governance/compliance-issues');
    return response.data.data;
  }
};
