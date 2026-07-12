import type {  Policy, PolicyFormData  } from '../types/policy';
import { initialMockPolicies } from '../constants/mockPolicies';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockPolicies];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const policyService = {
  getPolicies: async (): Promise<Policy[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createPolicy: async (data: PolicyFormData): Promise<Policy> => {
    await delay(600);
    const newPolicy: Policy = {
      ...data,
      id: `p${Date.now()}`,
      version: '1.0',
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    mockDatabase = [newPolicy, ...mockDatabase];
    return newPolicy;
  },

  updatePolicy: async (id: string, data: PolicyFormData): Promise<Policy> => {
    await delay(600);
    const index = mockDatabase.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Policy not found');

    const currentPolicy = mockDatabase[index];
    const updatedPolicy: Policy = {
      ...currentPolicy,
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0],
      // Bump minor version for mock purposes
      version: `${parseFloat(currentPolicy.version) + 0.1}`.substring(0, 3)
    };
    mockDatabase[index] = updatedPolicy;
    return updatedPolicy;
  },

  deletePolicy: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(p => p.id !== id);
  }
};
