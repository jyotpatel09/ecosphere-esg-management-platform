import React, { useState, useMemo } from 'react';
import { useAudits } from '../hooks/useAudits';
import { Audit, AuditFormData } from '../types/audit';
import { AuditTable } from '../components/AuditTable';
import { AuditForm } from '../components/AuditForm';
import { AuditDetailsDrawer } from '../components/AuditDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function AuditsPage() {
  const { audits, loading, error, createAudit, updateAudit, deleteAudit, refresh } = useAudits();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAudit, setEditingAudit] = useState<Audit | null>(null);

  const [viewingAudit, setViewingAudit] = useState<Audit | null>(null);
  
  const [deletingAudit, setDeletingAudit] = useState<Audit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredAudits = useMemo(() => {
    return audits.filter(audit => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        audit.auditName.toLowerCase().includes(query) ||
        audit.department.toLowerCase().includes(query) ||
        audit.auditor.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter ? audit.status === statusFilter : true;
      const matchesType = typeFilter ? audit.auditType === typeFilter : true;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [audits, searchQuery, statusFilter, typeFilter]);

  const handleOpenForm = (audit?: Audit) => {
    setEditingAudit(audit || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAudit(null);
  };

  const handleSubmitForm = async (data: AuditFormData) => {
    setIsSubmitting(true);
    try {
      if (editingAudit) {
        await updateAudit(editingAudit.id, data);
        if (viewingAudit?.id === editingAudit.id) {
          setViewingAudit({ ...editingAudit, ...data });
        }
      } else {
        await createAudit(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save audit', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAudit) return;
    setIsDeleting(true);
    try {
      await deleteAudit(deletingAudit.id);
      setDeletingAudit(null);
    } catch (err) {
      console.error('Failed to delete audit', err);
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
          title="Failed to load audits"
          description={error.message || 'An error occurred while fetching audits.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Internal Audits</h1>
          <p className="text-textSecondary mt-1">Schedule, track, and review all internal ESG and compliance audits.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Schedule Audit
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
              placeholder="Search by name, department, or auditor..."
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="relative flex items-center w-full sm:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Types</option>
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Compliance">Compliance</option>
                <option value="ESG Review">ESG Review</option>
              </select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <AuditTable
            audits={filteredAudits}
            onView={setViewingAudit}
            onEdit={handleOpenForm}
            onDelete={setDeletingAudit}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingAudit ? 'Edit Audit' : 'Schedule New Audit'}
      >
        <AuditForm
          initialData={editingAudit || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <AuditDetailsDrawer
        isOpen={!!viewingAudit}
        audit={viewingAudit}
        onClose={() => setViewingAudit(null)}
        onEdit={(audit) => {
          setViewingAudit(null);
          handleOpenForm(audit);
        }}
      />

      <ConfirmationModal
        isOpen={!!deletingAudit}
        onClose={() => setDeletingAudit(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Audit"
        description={`Are you sure you want to delete the audit "${deletingAudit?.auditName}"? This action cannot be undone.`}
        confirmText="Delete Audit"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
