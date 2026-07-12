import type { ReportExport, ReportExportFormData, ReportExportStatus } from '../types/reportExport';
import { initialMockReportExports } from '../constants/mockReportExports';

// Simulated in-memory database
let mockExportDatabase = [...initialMockReportExports];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const reportExportService = {
  getExports: async (): Promise<ReportExport[]> => {
    await delay(600);
    return [...mockExportDatabase].sort((a, b) => 
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  },

  createExport: async (data: ReportExportFormData): Promise<ReportExport> => {
    await delay(600);
    
    const newExport: ReportExport = {
      ...data,
      id: `exp-${Date.now()}`,
      requestedBy: 'Current User', // Would come from auth in prod
      status: 'Requested',
      createdDate: new Date().toISOString(),
    };
    
    mockExportDatabase = [newExport, ...mockExportDatabase];
    return newExport;
  },

  updateExportStatus: async (id: string, status: ReportExportStatus): Promise<ReportExport> => {
    await delay(500);
    const index = mockExportDatabase.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Export request not found');

    const updatedExport: ReportExport = {
      ...mockExportDatabase[index],
      status,
      ...(status === 'Completed' ? { completedDate: new Date().toISOString(), fileSize: '1.2 MB' } : {})
    };
    
    mockExportDatabase[index] = updatedExport;
    return updatedExport;
  },

  deleteExport: async (id: string): Promise<void> => {
    await delay(600);
    mockExportDatabase = mockExportDatabase.filter(e => e.id !== id);
  }
};
