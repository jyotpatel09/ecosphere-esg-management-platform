import { Audit, AuditFormData } from '../types/audit';
import { initialMockAudits } from '../constants/mockAudits';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockAudits];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const auditService = {
  getAudits: async (): Promise<Audit[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createAudit: async (data: AuditFormData): Promise<Audit> => {
    await delay(600);
    const newAudit: Audit = {
      ...data,
      id: `au${Date.now()}`,
      findingsCount: 0,
      completedDate: data.status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
    };
    mockDatabase = [newAudit, ...mockDatabase];
    return newAudit;
  },

  updateAudit: async (id: string, data: AuditFormData): Promise<Audit> => {
    await delay(600);
    const index = mockDatabase.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Audit not found');

    const currentAudit = mockDatabase[index];
    
    // Automatically set completedDate if status transitions to Completed
    let completedDate = currentAudit.completedDate;
    if (data.status === 'Completed' && currentAudit.status !== 'Completed') {
      completedDate = new Date().toISOString().split('T')[0];
    } else if (data.status !== 'Completed') {
      completedDate = undefined;
    }

    const updatedAudit: Audit = {
      ...currentAudit,
      ...data,
      completedDate,
    };
    mockDatabase[index] = updatedAudit;
    return updatedAudit;
  },

  deleteAudit: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(a => a.id !== id);
  }
};
