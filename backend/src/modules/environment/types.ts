import { CarbonTransaction, EmissionFactor, SustainabilityGoal } from '@prisma/client';

export type CreateCarbonTransactionDTO = {
  departmentId: string;
  userId: string;
  emissionFactorId: string;
  quantity: number;
  date: string;
  description?: string;
};

export type CreateSustainabilityGoalDTO = {
  departmentId?: string;
  title: string;
  description?: string;
  targetValue: number;
  metric: string;
  targetDate: string;
};
