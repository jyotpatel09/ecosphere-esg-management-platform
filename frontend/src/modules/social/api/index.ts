import api from '../../../services/api';
import type { CSRActivity, SocialKPI, CreateCSRActivityDTO, UpdateCSRActivityDTO } from '../types';

<<<<<<< HEAD
=======
// Depending on the project's setup, this could use an existing configured axios instance
// from `frontend/src/services/api.ts`. For this module, we use the relative path mapped to the proxy.
const API_URL = 'http://localhost:5000/api/v2/social';

>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
export const socialApi = {
  getActivities: async (): Promise<CSRActivity[]> => {
    const response = await api.get('/v2/social/activities');
    return response.data.data;
  },

  getActivityById: async (id: string): Promise<CSRActivity> => {
    const response = await api.get(`/v2/social/activities/${id}`);
    return response.data.data;
  },

  createActivity: async (data: CreateCSRActivityDTO): Promise<CSRActivity> => {
    const response = await api.post(`/v2/social/activities`, data);
    return response.data.data;
  },

  updateActivity: async (id: string, data: UpdateCSRActivityDTO): Promise<CSRActivity> => {
    const response = await api.put(`/v2/social/activities/${id}`, data);
    return response.data.data;
  },

  deleteActivity: async (id: string): Promise<void> => {
    await api.delete(`/v2/social/activities/${id}`);
  },

  getKPIs: async (): Promise<SocialKPI> => {
    const response = await api.get(`/v2/social/kpis`);
    return response.data.data;
  },
};
