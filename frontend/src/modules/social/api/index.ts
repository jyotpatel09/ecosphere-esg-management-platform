import api from '../../../services/api';
import type { CSRActivity, SocialKPI, CreateCSRActivityDTO, UpdateCSRActivityDTO } from '../types';

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
