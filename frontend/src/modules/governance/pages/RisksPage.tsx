import React, { useState, useMemo } from 'react';
import { useRisks } from '../hooks/useRisks';
import type {  Risk, RiskFormData  } from '../types/risk';
import { RiskTable } from '../components/RiskTable';
import { RiskForm } from '../components/RiskForm';
import { RiskDetailsDrawer } from '../components/RiskDetailsDrawer';
import { Card, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Loader } from '../../../shared/components/Loader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Modal } from '../../../shared/components/Modal';
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal';
import { Plus, Search, ShieldAlert, Filter } from 'lucide-react';

export function RisksPage() {
  const { risks, loading, error, createRisk, updateRisk, deleteRisk, refresh } = useRisks();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);

  const [viewingRisk, setViewingRisk] = useState<Risk | null>(null);
  
  const [deletingRisk, setDeletingRisk] = useState<Risk | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredRisks = useMemo(() => {
    return risks.filter(risk => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        risk.title.toLowerCase().includes(query) ||
        risk.department.toLowerCase().includes(query) ||
        risk.owner.toLowerCase().includes(query) ||
        risk.category.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter ? risk.status === statusFilter : true;
      const matchesSeverity = severityFilter ? risk.severity === severityFilter : true;
      const matchesCategory = categoryFilter ? risk.category === categoryFilter : true;
      
      return matchesSearch && matchesStatus && matchesSeverity && matchesCategory;
    });
  }, [risks, searchQuery, statusFilter, severityFilter, categoryFilter]);

  const handleOpenForm = (risk?: Risk) => {
    setEditingRisk(risk || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRisk(null);
  };

  const handleSubmitForm = async (data: RiskFormData) => {
    setIsSubmitting(true);
    try {
      if (editingRisk) {
        const updated = await updateRisk(editingRisk.id, data);
        if (viewingRisk?.id === editingRisk.id) {
          setViewingRisk(updated);
        }
      } else {
        await createRisk(data);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Failed to save risk', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRisk) return;
    setIsDeleting(true);
    try {
      await deleteRisk(deletingRisk.id);
      setDeletingRisk(null);
    } catch (err) {
      console.error('Failed to delete risk', err);
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
          title="Failed to load risks"
          description={error.message || 'An error occurred while fetching risks.'}
          action={<Button variant="primary" onClick={refresh}>Try Again</Button>}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Risk Management</h1>
          <p className="text-textSecondary mt-1">Identify, classify, monitor, and manage organizational ESG risks.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4" />
          Log Risk
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
              placeholder="Search by title, dept, category, or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto overflow-x-auto">
            <div className="relative flex items-center min-w-[140px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Categories</option>
                <option value="Environmental">Environmental</option>
                <option value="Compliance">Compliance</option>
                <option value="Operational">Operational</option>
                <option value="Financial">Financial</option>
                <option value="Governance">Governance</option>
              </select>
            </div>

            <div className="relative flex items-center min-w-[130px]">
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

            <div className="relative flex items-center min-w-[130px]">
              <Filter className="absolute left-3 h-4 w-4 text-textSecondary" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 bg-surface border border-surfaceHighlight rounded-md text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none w-full"
              >
                <option value="">All Statuses</option>
                <option value="Identified">Identified</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Mitigated">Mitigated</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <RiskTable
            risks={filteredRisks}
            onView={setViewingRisk}
            onEdit={handleOpenForm}
            onDelete={setDeletingRisk}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingRisk ? 'Edit Risk' : 'Log New Risk'}
      >
        <RiskForm
          initialData={editingRisk || undefined}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <RiskDetailsDrawer
        isOpen={!!viewingRisk}
        risk={viewingRisk}
        onClose={() => setViewingRisk(null)}
        onEdit={(risk) => {
          setViewingRisk(null);
          handleOpenForm(risk);
        }}
      />

      <ConfirmationModal
        isOpen={!!deletingRisk}
        onClose={() => setDeletingRisk(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Risk"
        description={`Are you sure you want to delete the risk "${deletingRisk?.title}"? This action cannot be undone.`}
        confirmText="Delete Risk"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
