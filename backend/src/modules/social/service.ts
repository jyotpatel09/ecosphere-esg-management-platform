import { socialRepository } from './repository';
import { CreateCSRActivityDTO, UpdateCSRActivityDTO, CSRActivity, SocialKPI } from './types';

export class SocialService {
  async getActivities(): Promise<CSRActivity[]> {
    return socialRepository.getActivities();
  }

  async getActivityById(id: string): Promise<CSRActivity | null> {
    return socialRepository.getActivityById(id);
  }

  async createActivity(data: CreateCSRActivityDTO): Promise<CSRActivity> {
    return socialRepository.createActivity(data);
  }

  async updateActivity(id: string, data: UpdateCSRActivityDTO): Promise<CSRActivity | null> {
    return socialRepository.updateActivity(id, data);
  }

  async deleteActivity(id: string): Promise<boolean> {
    return socialRepository.deleteActivity(id);
  }

  async getKPIs(): Promise<SocialKPI> {
    return socialRepository.getKPIs();
  }
}

export const socialService = new SocialService();
