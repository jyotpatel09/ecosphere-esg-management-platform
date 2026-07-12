import React, { useState, useMemo } from 'react';
import { useReportHistory } from '../hooks/useReportHistory';
import { ReportHistoryTable } from '../components/ReportHistoryTable';
import type { ReportActionType } from '../types/reportHistory';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Search, Filter, History, AlertCircle } from 'lucide-react';

export function ReportHistoryPage() {
  const { history, loading, error, refresh } = useReportHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<ReportActionType | ''>('');

  const filteredHistory = useMemo(() => {
    return history.filter(event => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        event.reportTitle.toLowerCase().includes(query) ||
        event.changedBy.toLowerCase().includes(query) ||
        event.details.toLowerCase().includes(query);

      const matchesAction = actionFilter ? event.actionType === actionFilter : true;

      return matchesSearch && matchesAction;
    });
  }, [history, searchQuery, actionFilter]);

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <EmptyState
          icon={<AlertCircle className="h-8 w-8" />}
          title="Failed to load history"
          description={error.message || 'An error occurred while fetching the report history.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Report History
          </h1>
          <p className="text-textSecondary mt-1">Audit log of all actions performed on ESG reports.</p>
        </div>
      </div>

      {/* Table Card */}
      <Card>
        {/* Toolbar */}
        <div className="p-4 border-b border-surfaceHighlight flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search by report, user, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex items-center w-full sm:w-48">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as ReportActionType | '')}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Actions</option>
                <option value="CREATED">Created</option>
                <option value="UPDATED">Updated</option>
                <option value="STATUS_CHANGED">Status Changed</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="PUBLISHED">Published</option>
                <option value="DELETED">Deleted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0">
          <ReportHistoryTable history={filteredHistory} />
        </CardContent>
      </Card>
    </div>
  );
}
