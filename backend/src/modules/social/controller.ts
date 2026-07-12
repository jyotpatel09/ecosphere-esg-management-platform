import { Request, Response, NextFunction } from 'express';
import { socialService } from './service';
import { createCSRActivitySchema, updateCSRActivitySchema } from './validator';

export class SocialController {
  async getActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const activities = await socialService.getActivities();
      res.json({ success: true, data: activities });
    } catch (error) {
      next(error);
    }
  }

  async getActivityById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const activity = await socialService.getActivityById(id);
      if (!activity) {
        return res.status(404).json({ success: false, error: 'Activity not found' });
      }
      res.json({ success: true, data: activity });
    } catch (error) {
      next(error);
    }
  }

  async createActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createCSRActivitySchema.parse(req.body);
      const newActivity = await socialService.createActivity(validatedData);
      res.status(201).json({ success: true, data: newActivity });
    } catch (error) {
      next(error);
    }
  }

  async updateActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateCSRActivitySchema.parse(req.body);
      const updatedActivity = await socialService.updateActivity(id, validatedData);
      
      if (!updatedActivity) {
        return res.status(404).json({ success: false, error: 'Activity not found' });
      }
      
      res.json({ success: true, data: updatedActivity });
    } catch (error) {
      next(error);
    }
  }

  async deleteActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const success = await socialService.deleteActivity(id);
      
      if (!success) {
        return res.status(404).json({ success: false, error: 'Activity not found' });
      }
      
      res.json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getKPIs(req: Request, res: Response, next: NextFunction) {
    try {
      const kpis = await socialService.getKPIs();
      res.json({ success: true, data: kpis });
    } catch (error) {
      next(error);
    }
  }
}

export const socialController = new SocialController();
