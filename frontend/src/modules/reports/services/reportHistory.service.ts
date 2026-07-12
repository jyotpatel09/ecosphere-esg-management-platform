import type { ReportHistoryEvent } from '../types/reportHistory';
import { initialMockReportHistory } from '../constants/mockReportHistory';

// Simulated in-memory database
let mockHistoryDatabase = [...initialMockReportHistory];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const reportHistoryService = {
  getHistory: async (reportId?: string): Promise<ReportHistoryEvent[]> => {
    await delay(600);
    
    if (reportId) {
      return mockHistoryDatabase.filter(event => event.reportId === reportId);
    }
    
    // Return all, sorted by newest first
    return [...mockHistoryDatabase].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },

  logEvent: async (event: Omit<ReportHistoryEvent, 'id' | 'timestamp'>): Promise<ReportHistoryEvent> => {
    await delay(400);
    
    const newEvent: ReportHistoryEvent = {
      ...event,
      id: `hist-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    mockHistoryDatabase = [newEvent, ...mockHistoryDatabase];
    return newEvent;
  }
};
