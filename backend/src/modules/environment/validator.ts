import { z } from 'zod';

export const createCarbonTransactionSchema = z.object({
  departmentId: z.string().uuid(),
  userId: z.string().uuid(),
  emissionFactorId: z.string().uuid(),
  quantity: z.number().positive(),
  date: z.string().datetime(),
  description: z.string().optional(),
});

export const createSustainabilityGoalSchema = z.object({
  departmentId: z.string().uuid().optional(),
  title: z.string().min(3),
  description: z.string().optional(),
  targetValue: z.number().positive(),
  metric: z.string().min(1),
  targetDate: z.string().datetime(),
});
