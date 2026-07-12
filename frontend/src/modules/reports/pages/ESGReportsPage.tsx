import React, { useState, useMemo } from 'react';
import { useESGReports } from '../hooks/useESGReports';
<<<<<<< HEAD
import type {  ESGReport, ESGReportFormData  } from '../types/esgReport';
=======
import type { ESGReport, ESGReportFormData } from '../types/esgReport';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { ESGReportTable } from '../components/ESGReportTable';
import { ESGReportForm } from '../components/ESGReportForm';
import { ReportDetailsDrawer } from '../components/ReportDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, FileText, Filter } from 'lucide-react';

export function ESGReportsPage() {
  const { reports, loading, error, createReport, updateReport, deleteReport, refresh } = useESGReports();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReport, setEditingReport] = useState<ESGReport | null>(null);

  const [viewingReport, setViewingReport] = useState<ESGReport | null>(null);

  const [deletingReport, setDeletingReport] = useState<ESGReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const uniqueDepartments = useMemo(
    () => Array.from(new Set(reports.map(r => r.department))).sort(),
    [reports]
  );

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        report.title.toLowerCase().includes(query) ||
        report.department.toLowerCase().includes(query) ||
        report.reportType.toLowerCase().includes(query);

      const matchesType = typeFilter ? report.reportType === typeFilter : true;
      const matchesStatus = statusFilter ? report.status === statusFilter : true;
      const matchesDept = departmentFilter ? report.department === departmentFilter : true;

      return matchesSearch && matchesType && matchesStatus && matchesDept;
    });
  }, [reports, searchQuery, typeFilter, statusFilter, departmentFilter]);

  const handleOpenForm = (report?: ESGReport) => {
    setEditingReport(report || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingReport(null);
  };

  const handleSubmitForm = async (data: ESGReportFormData) => {
    setIsSubmitting(true);
    try {
      if (editingReport) {
        const updated = await updateReport(editingReport.id, data);
        if (viewingReport?.id === editingReport.id) {
          setViewingReport(updated);
        }
      } else {
        await createReport(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save report', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingReport) return;
    setIsDeleting(true);
    try {
      await deleteReport(deletingReport.id);
      setDeletingReport(null);
    } catch (err) {
      console.error('Failed to delete report', err);
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
          icon={<FileText className="h-8 w-8" />}
          title="Failed to load reports"
          description={error.message || 'An error occurred while fetching reports.'}
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
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">ESG Reports</h1>
          <p className="text-textSecondary mt-1">View, create, and manage all ESG and sustainability reports.</p>
        </div>
        <Button variant="primary" className="gap-2 self-start sm:self-auto" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Create Report
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
              placeholder="Search by title, type, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            {/* Type filter */}
            <div className="relative flex items-center w-full sm:w-auto min-w-[160px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Types</option>
                <option value="ESG Summary">ESG Summary</option>
                <option value="Sustainability Report">Sustainability Report</option>
                <option value="Compliance Report">Compliance Report</option>
                <option value="Carbon Report">Carbon Report</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="relative flex items-center w-full sm:w-auto min-w-[140px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Generated">Generated</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Published">Published</option>
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

        {/* Table */}
        <CardContent className="p-0">
          <ESGReportTable
            reports={filteredReports}
            onView={setViewingReport}
            onEdit={handleOpenForm}
            onDelete={setDeletingReport}
          />
        </CardContent>
      </Card>

      {/* Create / Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingReport ? 'Edit Report' : 'Create New Report'}
      >
        <ESGReportForm
          initialData={editingReport || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Details Drawer */}
      <ReportDetailsDrawer
        isOpen={!!viewingReport}
        report={viewingReport}
        onClose={() => setViewingReport(null)}
        onEdit={(report) => {
          setViewingReport(null);
          handleOpenForm(report);
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deletingReport}
        onClose={() => setDeletingReport(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Report"
        description={`Are you sure you want to delete the report "${deletingReport?.title}"? This action cannot be undone.`}
        confirmText="Delete Report"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
