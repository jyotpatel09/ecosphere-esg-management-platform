import api from '../../../services/api';

export const gamificationApi = {
  getDashboardData: async () => {
    const response = await api.get('/v2/gamification/dashboard');
    return response.data.data;
  },
  getLeaderboard: async () => {
    const response = await api.get('/v2/gamification/leaderboard');
    return response.data.data;
  }
};
