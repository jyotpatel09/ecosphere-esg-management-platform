import type {  ESGReport, ESGReportFormData  } from '../types/esgReport';
import { initialMockESGReports } from '../constants/mockESGReports';

// Simulated in-memory database for mock environment
let mockDatabase = [...initialMockESGReports];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const esgReportService = {
  getReports: async (): Promise<ESGReport[]> => {
    await delay(600);
    return [...mockDatabase];
  },

  createReport: async (data: ESGReportFormData): Promise<ESGReport> => {
    await delay(600);
    const newReport: ESGReport = {
      ...data,
      id: `esg${Date.now()}`,
      createdBy: 'Current User', // Replaced by auth context in production
      createdDate: new Date().toISOString().split('T')[0],
    };
    mockDatabase = [newReport, ...mockDatabase];
    return newReport;
  },

  updateReport: async (id: string, data: ESGReportFormData): Promise<ESGReport> => {
    await delay(600);
    const index = mockDatabase.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Report not found');

    const updatedReport: ESGReport = {
      ...mockDatabase[index],
      ...data,
    };
    mockDatabase[index] = updatedReport;
    return updatedReport;
  },

  deleteReport: async (id: string): Promise<void> => {
    await delay(600);
    mockDatabase = mockDatabase.filter(r => r.id !== id);
  },
};
