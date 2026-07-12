import React, { useState, useMemo } from 'react';
import { useComplianceIssues } from '../hooks/useComplianceIssues';
import { ComplianceIssue, ComplianceFormData } from '../types/compliance';
import { ComplianceTable } from '../components/ComplianceTable';
import { ComplianceForm } from '../components/ComplianceForm';
import { ComplianceDetailsDrawer } from '../components/ComplianceDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function ComplianceIssuesPage() {
  const { complianceIssues, loading, error, createIssue, updateIssue, deleteIssue, refresh } = useComplianceIssues();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIssue, setEditingIssue] = useState<ComplianceIssue | null>(null);

  const [viewingIssue, setViewingIssue] = useState<ComplianceIssue | null>(null);
  
  const [deletingIssue, setDeletingIssue] = useState<ComplianceIssue | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredIssues = useMemo(() => {
    return complianceIssues.filter(issue => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        issue.title.toLowerCase().includes(query) ||
        issue.policy.toLowerCase().includes(query) ||
        issue.department.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter ? issue.status === statusFilter : true;
      const matchesSeverity = severityFilter ? issue.severity === severityFilter : true;
      
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [complianceIssues, searchQuery, statusFilter, severityFilter]);

  const handleOpenForm = (issue?: ComplianceIssue) => {
    setEditingIssue(issue || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingIssue(null);
  };

  const handleSubmitForm = async (data: ComplianceFormData) => {
    setIsSubmitting(true);
    try {
      if (editingIssue) {
        await updateIssue(editingIssue.id, data);
        if (viewingIssue?.id === editingIssue.id) {
          setViewingIssue({ ...editingIssue, ...data, updatedAt: new Date().toISOString().split('T')[0] });
        }
      } else {
        await createIssue(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save compliance issue', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingIssue) return;
    setIsDeleting(true);
    try {
      await deleteIssue(deletingIssue.id);
      setDeletingIssue(null);
    } catch (err) {
      console.error('Failed to delete compliance issue', err);
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
          icon={<ShieldAlert className="h-8 w-8" />}
          title="Failed to load compliance issues"
          description={error.message || 'An error occurred while fetching issues.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Compliance Issues</h1>
          <p className="text-textSecondary mt-1">Track and manage ESG non-compliance incidents and breaches.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Log Issue
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-surfaceHighlight flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search by title, policy, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative flex items-center w-full sm:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            
            <div className="relative flex items-center w-full sm:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <ComplianceTable
            issues={filteredIssues}
            onView={setViewingIssue}
            onEdit={handleOpenForm}
            onDelete={setDeletingIssue}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingIssue ? 'Edit Compliance Issue' : 'Log New Issue'}
      >
        <ComplianceForm
          initialData={editingIssue || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ComplianceDetailsDrawer
        isOpen={!!viewingIssue}
        issue={viewingIssue}
        onClose={() => setViewingIssue(null)}
        onEdit={(issue) => {
          setViewingIssue(null);
          handleOpenForm(issue);
        }}
      />

      <ConfirmationModal
        isOpen={!!deletingIssue}
        onClose={() => setDeletingIssue(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Compliance Issue"
        description={`Are you sure you want to delete the issue "${deletingIssue?.title}"? This action cannot be undone.`}
        confirmText="Delete Issue"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
