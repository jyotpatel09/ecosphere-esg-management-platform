import type {  CorrectiveAction, CorrectiveActionFormData  } from '../types/correctiveAction';
import { initialMockCorrectiveActions } from '../constants/mockCorrectiveActions';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockCorrectiveActions];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const correctiveActionService = {
  getActions: async (): Promise<CorrectiveAction[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createAction: async (data: CorrectiveActionFormData): Promise<CorrectiveAction> => {
    await delay(600);
    const newAction: CorrectiveAction = {
      ...data,
      id: `ca${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      completedDate: data.status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
    };
    mockDatabase = [newAction, ...mockDatabase];
    return newAction;
  },

  updateAction: async (id: string, data: CorrectiveActionFormData): Promise<CorrectiveAction> => {
    await delay(600);
    const index = mockDatabase.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Corrective action not found');

    const currentAction = mockDatabase[index];
    
    // Automatically set completedDate if status transitions to Completed
    let completedDate = currentAction.completedDate;
    if (data.status === 'Completed' && currentAction.status !== 'Completed') {
      completedDate = new Date().toISOString().split('T')[0];
    } else if (data.status !== 'Completed') {
      completedDate = undefined;
    }

    const updatedAction: CorrectiveAction = {
      ...currentAction,
      ...data,
      completedDate,
    };
    mockDatabase[index] = updatedAction;
    return updatedAction;
  },

  deleteAction: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(a => a.id !== id);
  }
};
