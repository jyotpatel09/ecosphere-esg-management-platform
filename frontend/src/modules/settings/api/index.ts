import api from '../../../services/api';

export const settingsApi = {
  getPreferences: async () => {
    const response = await api.get('/v2/settings/preferences');
    return response.data.data;
  },
  updatePreferences: async (data: any) => {
    const response = await api.put('/v2/settings/preferences', data);
    return response.data.data;
  },
  getUsers: async () => {
    const response = await api.get('/v2/settings/users');
    return response.data.data;
  }
};
