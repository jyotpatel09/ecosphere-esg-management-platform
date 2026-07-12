import React, { useState, useMemo } from 'react';
import { useCorrectiveActions } from '../hooks/useCorrectiveActions';
import type {  CorrectiveAction, CorrectiveActionFormData  } from '../types/correctiveAction';
import { CorrectiveActionTable } from '../components/CorrectiveActionTable';
import { CorrectiveActionForm } from '../components/CorrectiveActionForm';
import { CorrectiveActionDetailsDrawer } from '../components/CorrectiveActionDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function CorrectiveActionsPage() {
  const { correctiveActions, loading, error, createAction, updateAction, deleteAction, refresh } = useCorrectiveActions();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAction, setEditingAction] = useState<CorrectiveAction | null>(null);

  const [viewingAction, setViewingAction] = useState<CorrectiveAction | null>(null);
  
  const [deletingAction, setDeletingAction] = useState<CorrectiveAction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredActions = useMemo(() => {
    return correctiveActions.filter(action => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        action.title.toLowerCase().includes(query) ||
        action.relatedIssue.toLowerCase().includes(query) ||
        action.department.toLowerCase().includes(query) ||
        action.assignedTo.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter ? action.status === statusFilter : true;
      const matchesPriority = priorityFilter ? action.priority === priorityFilter : true;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [correctiveActions, searchQuery, statusFilter, priorityFilter]);

  const handleOpenForm = (action?: CorrectiveAction) => {
    setEditingAction(action || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAction(null);
  };

  const handleSubmitForm = async (data: CorrectiveActionFormData) => {
    setIsSubmitting(true);
    try {
      if (editingAction) {
        await updateAction(editingAction.id, data);
        if (viewingAction?.id === editingAction.id) {
          // Approximate the update for immediate UI feedback in drawer
          setViewingAction({ ...editingAction, ...data });
        }
      } else {
        await createAction(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save corrective action', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAction) return;
    setIsDeleting(true);
    try {
      await deleteAction(deletingAction.id);
      setDeletingAction(null);
    } catch (err) {
      console.error('Failed to delete corrective action', err);
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
          title="Failed to load corrective actions"
          description={error.message || 'An error occurred while fetching actions.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Corrective Actions</h1>
          <p className="text-textSecondary mt-1">Manage remediation tasks created from compliance issues and audits.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Create Action
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
              placeholder="Search by title, issue, dept, or assignee..."
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
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            
            <div className="relative flex items-center w-full sm:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <CorrectiveActionTable
            actions={filteredActions}
            onView={setViewingAction}
            onEdit={handleOpenForm}
            onDelete={setDeletingAction}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingAction ? 'Edit Corrective Action' : 'Create New Action'}
      >
        <CorrectiveActionForm
          initialData={editingAction || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <CorrectiveActionDetailsDrawer
        isOpen={!!viewingAction}
        action={viewingAction}
        onClose={() => setViewingAction(null)}
        onEdit={(action) => {
          setViewingAction(null);
          handleOpenForm(action);
        }}
      />

      <ConfirmationModal
        isOpen={!!deletingAction}
        onClose={() => setDeletingAction(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Corrective Action"
        description={`Are you sure you want to delete the corrective action "${deletingAction?.title}"? This action cannot be undone.`}
        confirmText="Delete Action"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
