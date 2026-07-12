import prisma from '../../config/db';
import { CreateCarbonTransactionDTO, CreateSustainabilityGoalDTO } from './types';

export class EnvironmentRepository {
  async getCarbonTransactions() {
    return prisma.carbonTransaction.findMany({
      include: { emissionFactor: true, department: true },
      orderBy: { date: 'desc' },
    });
  }

  async createCarbonTransaction(data: CreateCarbonTransactionDTO & { calculatedCO2e: number }) {
    return prisma.carbonTransaction.create({
      data,
    });
  }

  async getEmissionFactors() {
    return prisma.emissionFactor.findMany();
  }
  
  async getEmissionFactorById(id: string) {
    return prisma.emissionFactor.findUnique({ where: { id } });
  }

  async getSustainabilityGoals() {
    return prisma.sustainabilityGoal.findMany({
      orderBy: { targetDate: 'asc' },
    });
  }
  
  async createSustainabilityGoal(data: CreateSustainabilityGoalDTO) {
    return prisma.sustainabilityGoal.create({
      data,
    });
  }
}

export const environmentRepository = new EnvironmentRepository();
