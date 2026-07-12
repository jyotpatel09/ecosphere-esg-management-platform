import type {  ComplianceIssue, ComplianceFormData  } from '../types/compliance';
import { initialMockComplianceIssues } from '../constants/mockComplianceIssues';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockComplianceIssues];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const complianceService = {
  getComplianceIssues: async (): Promise<ComplianceIssue[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createIssue: async (data: ComplianceFormData): Promise<ComplianceIssue> => {
    await delay(600);
    const newIssue: ComplianceIssue = {
      ...data,
      id: `ci${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    mockDatabase = [newIssue, ...mockDatabase];
    return newIssue;
  },

  updateIssue: async (id: string, data: ComplianceFormData): Promise<ComplianceIssue> => {
    await delay(600);
    const index = mockDatabase.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Compliance issue not found');

    const currentIssue = mockDatabase[index];
    const updatedIssue: ComplianceIssue = {
      ...currentIssue,
      ...data,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    mockDatabase[index] = updatedIssue;
    return updatedIssue;
  },

  deleteIssue: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(i => i.id !== id);
  }
};
