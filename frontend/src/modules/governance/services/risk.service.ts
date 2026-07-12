import { Risk, RiskFormData, RiskLikelihood, RiskImpact, RiskSeverity } from '../types/risk';
import { initialMockRisks } from '../constants/mockRisks';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockRisks];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateRiskMetrics = (likelihood: RiskLikelihood, impact: RiskImpact): { riskScore: number, severity: RiskSeverity } => {
  const likelihoodScore = { 'Rare': 1, 'Possible': 2, 'Likely': 3, 'Almost Certain': 4 }[likelihood];
  const impactScore = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 }[impact];
  
  const riskScore = likelihoodScore * impactScore;
  
  let severity: RiskSeverity = 'Low';
  if (riskScore >= 13) severity = 'Critical';
  else if (riskScore >= 10) severity = 'High';
  else if (riskScore >= 5) severity = 'Medium';
  
  return { riskScore, severity };
};

export const riskService = {
  getRisks: async (): Promise<Risk[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createRisk: async (data: RiskFormData): Promise<Risk> => {
    await delay(600);
    const { riskScore, severity } = calculateRiskMetrics(data.likelihood, data.impact);
    
    const newRisk: Risk = {
      ...data,
      id: `r${Date.now()}`,
      riskScore,
      severity,
      createdDate: new Date().toISOString().split('T')[0],
      reviewedDate: new Date().toISOString().split('T')[0],
    };
    mockDatabase = [newRisk, ...mockDatabase];
    return newRisk;
  },

  updateRisk: async (id: string, data: RiskFormData): Promise<Risk> => {
    await delay(600);
    const index = mockDatabase.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Risk not found');

    const { riskScore, severity } = calculateRiskMetrics(data.likelihood, data.impact);

    const updatedRisk: Risk = {
      ...mockDatabase[index],
      ...data,
      riskScore,
      severity,
      reviewedDate: new Date().toISOString().split('T')[0],
    };
    mockDatabase[index] = updatedRisk;
    return updatedRisk;
  },

  deleteRisk: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(r => r.id !== id);
  }
};
