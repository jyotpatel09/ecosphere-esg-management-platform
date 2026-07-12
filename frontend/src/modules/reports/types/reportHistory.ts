export type ReportActionType = 'CREATED' | 'UPDATED' | 'DELETED' | 'STATUS_CHANGED' | 'REVIEWED' | 'PUBLISHED';

export interface ReportHistoryEvent {
  id: string;
  reportId: string;
  reportTitle: string;
  actionType: ReportActionType;
  changedBy: string;
  timestamp: string;
  details: string;
}

export interface ReportHistoryFilter {
  actionType?: ReportActionType | '';
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}
