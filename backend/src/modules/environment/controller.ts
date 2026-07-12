import { Request, Response } from 'express';
import { environmentService } from './service';
import { createCarbonTransactionSchema, createSustainabilityGoalSchema } from './validator';

export class EnvironmentController {
  async getDashboardData(req: Request, res: Response) {
    try {
      const data = await environmentService.getDashboardMetrics();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const validatedData = createCarbonTransactionSchema.parse(req.body);
      const transaction = await environmentService.createCarbonTransaction(validatedData);
      res.status(201).json({ success: true, data: transaction });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
  
  async getFactors(req: Request, res: Response) {
    try {
      const factors = await environmentService.getEmissionFactors();
      res.json({ success: true, data: factors });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createGoal(req: Request, res: Response) {
    try {
      const validatedData = createSustainabilityGoalSchema.parse(req.body);
      const goal = await environmentService.createSustainabilityGoal(validatedData);
      res.status(201).json({ success: true, data: goal });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

export const environmentController = new EnvironmentController();
