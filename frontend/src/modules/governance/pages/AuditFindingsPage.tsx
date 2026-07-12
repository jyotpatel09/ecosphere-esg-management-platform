import React, { useState, useMemo } from 'react';
import { useAuditFindings } from '../hooks/useAuditFindings';
import { AuditFinding, AuditFindingFormData } from '../types/auditFinding';
import { AuditFindingTable } from '../components/AuditFindingTable';
import { AuditFindingForm } from '../components/AuditFindingForm';
import { AuditFindingDetailsDrawer } from '../components/AuditFindingDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function AuditFindingsPage() {
  const { findings, loading, error, createFinding, updateFinding, deleteFinding, refresh } = useAuditFindings();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFinding, setEditingFinding] = useState<AuditFinding | null>(null);

  const [viewingFinding, setViewingFinding] = useState<AuditFinding | null>(null);
  
  const [deletingFinding, setDeletingFinding] = useState<AuditFinding | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredFindings = useMemo(() => {
    return findings.filter(finding => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        finding.title.toLowerCase().includes(query) ||
        finding.auditName.toLowerCase().includes(query) ||
        finding.department.toLowerCase().includes(query) ||
        finding.assignedTo.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter ? finding.status === statusFilter : true;
      const matchesSeverity = severityFilter ? finding.severity === severityFilter : true;
      
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [findings, searchQuery, statusFilter, severityFilter]);

  const handleOpenForm = (finding?: AuditFinding) => {
    setEditingFinding(finding || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingFinding(null);
  };

  const handleSubmitForm = async (data: AuditFindingFormData) => {
    setIsSubmitting(true);
    try {
      if (editingFinding) {
        await updateFinding(editingFinding.id, data);
        if (viewingFinding?.id === editingFinding.id) {
          setViewingFinding({ ...editingFinding, ...data });
        }
      } else {
        await createFinding(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save audit finding', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingFinding) return;
    setIsDeleting(true);
    try {
      await deleteFinding(deletingFinding.id);
      setDeletingFinding(null);
    } catch (err) {
      console.error('Failed to delete audit finding', err);
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
          title="Failed to load audit findings"
          description={error.message || 'An error occurred while fetching findings.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Audit Findings</h1>
          <p className="text-textSecondary mt-1">Review and action issues discovered during internal and external audits.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Document Finding
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
              placeholder="Search by title, audit, dept, or assignee..."
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
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
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
          <AuditFindingTable
            findings={filteredFindings}
            onView={setViewingFinding}
            onEdit={handleOpenForm}
            onDelete={setDeletingFinding}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingFinding ? 'Edit Audit Finding' : 'Document New Finding'}
      >
        <AuditFindingForm
          initialData={editingFinding || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <AuditFindingDetailsDrawer
        isOpen={!!viewingFinding}
        finding={viewingFinding}
        onClose={() => setViewingFinding(null)}
        onEdit={(finding) => {
          setViewingFinding(null);
          handleOpenForm(finding);
        }}
      />

      <ConfirmationModal
        isOpen={!!deletingFinding}
        onClose={() => setDeletingFinding(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Audit Finding"
        description={`Are you sure you want to delete the finding "${deletingFinding?.title}"? This action cannot be undone.`}
        confirmText="Delete Finding"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
