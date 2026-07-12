import type {  AuditFinding, AuditFindingFormData  } from '../types/auditFinding';
import { initialMockAuditFindings } from '../constants/mockAuditFindings';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockAuditFindings];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const auditFindingService = {
  getFindings: async (): Promise<AuditFinding[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createFinding: async (data: AuditFindingFormData): Promise<AuditFinding> => {
    await delay(600);
    const newFinding: AuditFinding = {
      ...data,
      id: `af${Date.now()}`,
      auditId: `au${Date.now()}`, // In a real system, this would be tied to an actual selected audit
      identifiedDate: new Date().toISOString().split('T')[0],
    };
    mockDatabase = [newFinding, ...mockDatabase];
    return newFinding;
  },

  updateFinding: async (id: string, data: AuditFindingFormData): Promise<AuditFinding> => {
    await delay(600);
    const index = mockDatabase.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Audit finding not found');

    const updatedFinding: AuditFinding = {
      ...mockDatabase[index],
      ...data,
    };
    mockDatabase[index] = updatedFinding;
    return updatedFinding;
  },

  deleteFinding: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(f => f.id !== id);
  }
};
