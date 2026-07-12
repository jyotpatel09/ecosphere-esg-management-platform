import React, { useState, useMemo } from 'react';
import { usePolicies } from '../hooks/usePolicies';
import type {  Policy, PolicyFormData  } from '../types/policy';
import { PolicyTable } from '../components/PolicyTable';
import { PolicyForm } from '../components/PolicyForm';
import { PolicyDetailsDrawer } from '../components/PolicyDetailsDrawer';
import { DeletePolicyDialog } from '../components/DeletePolicyDialog';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function PoliciesPage() {
  const { policies, loading, error, createPolicy, updatePolicy, deletePolicy, refresh } = usePolicies();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const [viewingPolicy, setViewingPolicy] = useState<Policy | null>(null);
  
  const [deletingPolicy, setDeletingPolicy] = useState<Policy | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const matchesSearch = 
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter ? policy.status === statusFilter : true;
      const matchesCategory = categoryFilter ? policy.category === categoryFilter : true;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [policies, searchQuery, statusFilter, categoryFilter]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(policies.map(p => p.category)));
  }, [policies]);

  const handleOpenForm = (policy?: Policy) => {
    setEditingPolicy(policy || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPolicy(null);
  };

  const handleSubmitForm = async (data: PolicyFormData) => {
    setIsSubmitting(true);
    try {
      if (editingPolicy) {
        await updatePolicy(editingPolicy.id, data);
        if (viewingPolicy?.id === editingPolicy.id) {
          // Update the viewing policy if it's currently open
          setViewingPolicy({ ...editingPolicy, ...data });
        }
      } else {
        await createPolicy(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save policy', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPolicy) return;
    setIsDeleting(true);
    try {
      await deletePolicy(deletingPolicy.id);
      setDeletingPolicy(null);
    } catch (err) {
      console.error('Failed to delete policy', err);
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
          title="Failed to load policies"
          description={error.message || 'An error occurred while fetching policies.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Policy Management</h1>
          <p className="text-textSecondary mt-1">Manage, review, and track all ESG and compliance policies.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Create Policy
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-surfaceHighlight flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search by title, category, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex items-center w-full md:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div className="relative flex items-center w-full md:w-auto">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <PolicyTable
            policies={filteredPolicies}
            onView={setViewingPolicy}
            onEdit={handleOpenForm}
            onDelete={setDeletingPolicy}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingPolicy ? 'Edit Policy' : 'Create New Policy'}
      >
        <PolicyForm
          initialData={editingPolicy || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <PolicyDetailsDrawer
        isOpen={!!viewingPolicy}
        policy={viewingPolicy}
        onClose={() => setViewingPolicy(null)}
        onEdit={(policy) => {
          setViewingPolicy(null);
          handleOpenForm(policy);
        }}
      />

      <DeletePolicyDialog
        isOpen={!!deletingPolicy}
        onClose={() => setDeletingPolicy(null)}
        onConfirm={handleDeleteConfirm}
        policyTitle={deletingPolicy?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
}
