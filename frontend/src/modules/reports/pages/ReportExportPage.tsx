import React, { useState, useMemo } from 'react';
import { useReportExports } from '../hooks/useReportExports';
import type { ReportExport, ReportExportFormData, ReportExportFormat, ReportExportStatus } from '../types/reportExport';
import { ReportExportTable } from '../components/ReportExportTable';
import { ReportExportForm } from '../components/ReportExportForm';
import { ReportExportDetailsDrawer } from '../components/ReportExportDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Search, Filter, DownloadCloud, Plus, AlertCircle } from 'lucide-react';

export function ReportExportPage() {
  const { exports, loading, error, createExport, updateExportStatus, deleteExport, refresh } = useReportExports();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<ReportExportFormat | ''>('');
  const [statusFilter, setStatusFilter] = useState<ReportExportStatus | ''>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');

  // Modals & Drawers State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingExport, setViewingExport] = useState<ReportExport | null>(null);
  const [deletingExport, setDeletingExport] = useState<ReportExport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const uniqueDepartments = useMemo(
    () => Array.from(new Set(exports.map(e => e.department))).sort(),
    [exports]
  );

  const filteredExports = useMemo(() => {
    return exports.filter(req => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        req.reportName.toLowerCase().includes(query) ||
        req.requestedBy.toLowerCase().includes(query) ||
        req.department.toLowerCase().includes(query);

      const matchesFormat = formatFilter ? req.exportFormat === formatFilter : true;
      const matchesStatus = statusFilter ? req.status === statusFilter : true;
      const matchesDept = departmentFilter ? req.department === departmentFilter : true;

      return matchesSearch && matchesFormat && matchesStatus && matchesDept;
    });
  }, [exports, searchQuery, formatFilter, statusFilter, departmentFilter]);

  const handleSubmitForm = async (data: ReportExportFormData) => {
    setIsSubmitting(true);
    try {
      await createExport(data);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Failed to request export', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: ReportExportStatus) => {
    try {
      const updated = await updateExportStatus(id, status);
      if (viewingExport?.id === id) {
        setViewingExport(updated);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExport) return;
    setIsDeleting(true);
    try {
      await deleteExport(deletingExport.id);
      setDeletingExport(null);
    } catch (err) {
      console.error('Failed to delete export', err);
    } finally {
      setIsDeleting(false);
    }
  };

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
          title="Failed to load export requests"
          description={error.message || 'An error occurred while fetching report exports.'}
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
            <DownloadCloud className="h-6 w-6 text-primary" />
            Report Exports
          </h1>
          <p className="text-textSecondary mt-1">Manage, track, and download exported ESG reports.</p>
        </div>
        <Button variant="primary" className="gap-2 self-start sm:self-auto" onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Request Export
        </Button>
      </div>

      {/* Table Card */}
      <Card>
        {/* Toolbar */}
        <div className="p-4 border-b border-surfaceHighlight flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search by report name, requester, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            {/* Format filter */}
            <div className="relative flex items-center w-full sm:w-auto min-w-[130px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value as ReportExportFormat | '')}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Formats</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="relative flex items-center w-full sm:w-auto min-w-[140px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ReportExportStatus | '')}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Statuses</option>
                <option value="Requested">Requested</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Department filter */}
            <div className="relative flex items-center w-full sm:w-auto min-w-[150px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Departments</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0">
          <ReportExportTable
            exports={filteredExports}
            onView={setViewingExport}
            onDelete={setDeletingExport}
          />
        </CardContent>
      </Card>

      {/* Request Export Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Request Report Export"
      >
        <ReportExportForm
          onSubmit={handleSubmitForm}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Export Details Drawer */}
      <ReportExportDetailsDrawer
        isOpen={!!viewingExport}
        exportRequest={viewingExport}
        onClose={() => setViewingExport(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deletingExport}
        onClose={() => setDeletingExport(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Export Request"
        description={`Are you sure you want to delete the export request for "${deletingExport?.reportName}"? This will also remove the downloaded file permanently if completed.`}
        confirmText="Delete Request"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
