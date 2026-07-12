import { environmentRepository } from './repository';
import { CreateCarbonTransactionDTO, CreateSustainabilityGoalDTO } from './types';

export class EnvironmentService {
  async getDashboardMetrics() {
    const transactions = await environmentRepository.getCarbonTransactions();
    const goals = await environmentRepository.getSustainabilityGoals();
    
    // Basic aggregation
    let totalEmissions = 0;
    transactions.forEach(tx => totalEmissions += tx.calculatedCO2e);
    
    return {
      metrics: {
        totalEmissions,
        scope1: 0,
        scope2: 0,
        scope3: 0,
      },
      transactions: transactions.slice(0, 10),
      goals
    };
  }

  async createCarbonTransaction(data: CreateCarbonTransactionDTO) {
    const factor = await environmentRepository.getEmissionFactorById(data.emissionFactorId);
    if (!factor) {
      throw new Error('Emission factor not found');
    }
    
    const calculatedCO2e = data.quantity * factor.value;
    
    return environmentRepository.createCarbonTransaction({
      ...data,
      calculatedCO2e
    });
  }
  
  async createSustainabilityGoal(data: CreateSustainabilityGoalDTO) {
    return environmentRepository.createSustainabilityGoal(data);
  }
  
  async getEmissionFactors() {
    return environmentRepository.getEmissionFactors();
  }
}

export const environmentService = new EnvironmentService();
