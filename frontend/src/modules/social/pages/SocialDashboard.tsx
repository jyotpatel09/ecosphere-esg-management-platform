import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { useSocial } from '../hooks/useSocial';
import { ActivityList } from '../components/ActivityList';
import { ActivityForm } from '../components/ActivityForm';
import { Modal } from '../../../shared/components/Modal';
import type { CSRActivity } from '../types';

export function SocialDashboard() {
  const { activities, kpis, isLoading, refetch, deleteActivity } = useSocial();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<CSRActivity | null>(null);

  const handleOpenNew = () => {
    setEditingActivity(null);
    setIsFormOpen(true);
  };

  const handleEdit = (activity: CSRActivity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    refetch();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Social Impact Module</h1>
        <Button onClick={handleOpenNew}>Create Activity</Button>
      </div>

      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-textSecondary">Total Volunteer Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{kpis.totalVolunteerHours}</div>
              <p className="text-xs text-textSecondary mt-1">Period: {kpis.period}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-textSecondary">Diversity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{kpis.diversityScore}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-textSecondary">Community Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">${kpis.communityInvestment.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>CSR Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityList
            activities={activities}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={deleteActivity}
          />
        </CardContent>
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingActivity ? "Edit Activity" : "Create New Activity"}
      >
        <ActivityForm
          activity={editingActivity}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
}
