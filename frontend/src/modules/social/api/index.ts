import axios from 'axios';
import type { CSRActivity, SocialKPI, CreateCSRActivityDTO, UpdateCSRActivityDTO } from '../types';

// Depending on the project's setup, this could use an existing configured axios instance
// from `frontend/src/services/api.ts`. For this module, we use the relative path mapped to the proxy.
const API_URL = 'http://localhost:5000/api/v2/social';

export const socialApi = {
  getActivities: async (): Promise<CSRActivity[]> => {
    const response = await axios.get(`${API_URL}/activities`);
    return response.data.data;
  },

  getActivityById: async (id: string): Promise<CSRActivity> => {
    const response = await axios.get(`${API_URL}/activities/${id}`);
    return response.data.data;
  },

  createActivity: async (data: CreateCSRActivityDTO): Promise<CSRActivity> => {
    const response = await axios.post(`${API_URL}/activities`, data);
    return response.data.data;
  },

  updateActivity: async (id: string, data: UpdateCSRActivityDTO): Promise<CSRActivity> => {
    const response = await axios.put(`${API_URL}/activities/${id}`, data);
    return response.data.data;
  },

  deleteActivity: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/activities/${id}`);
  },

  getKPIs: async (): Promise<SocialKPI> => {
    const response = await axios.get(`${API_URL}/kpis`);
    return response.data.data;
  },
};
