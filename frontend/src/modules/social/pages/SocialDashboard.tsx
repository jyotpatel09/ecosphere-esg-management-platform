import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { useSocial } from '../hooks/useSocial';
import { ActivityList } from '../components/ActivityList';
import { ActivityForm } from '../components/ActivityForm';
import { Modal } from '../../../shared/components/Modal';
import { Heart, Users, DollarSign, Plus, Download, FileText, ArrowRight } from 'lucide-react';
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
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Social Impact & Diversity</h1>
          <p className="text-sm text-textSecondary mt-1">Manage corporate social responsibility (CSR) initiatives and diversity metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button variant="primary" size="sm" onClick={handleOpenNew}><Plus className="h-4 w-4 mr-1.5" /> Log Activity</Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Total Volunteer Hours</CardTitle>
            <Badge variant="success">On Track</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-textPrimary tracking-tight">{kpis?.totalVolunteerHours || 0}</div>
              <span className="text-xs text-textSecondary">/ 1,200h goal</span>
            </div>
            <p className="text-xs text-emerald-500 font-semibold mt-2 flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1" /> Period: {kpis?.period || 'Q3 2026'}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Diversity Score</CardTitle>
            <Badge variant="success">Improving</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-textPrimary tracking-tight">{kpis?.diversityScore || 0}%</div>
            </div>
            <p className="text-xs text-emerald-500 font-semibold mt-2 flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" /> +2.4% vs last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Community Investment</CardTitle>
            <Badge variant="warning">At Risk</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-textPrimary tracking-tight">
                ${kpis?.communityInvestment ? kpis.communityInvestment.toLocaleString() : 0}
              </div>
            </div>
            <p className="text-xs text-amber-500 font-semibold mt-2 flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1" /> Gap to annual target: $45k
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4 flex-1 min-h-[500px]">
        {/* Main List Area */}
        <div className="lg:col-span-2 xl:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-border bg-surfaceHighlight/20 py-4 flex flex-row justify-between items-center">
              <CardTitle>CSR Activities Register</CardTitle>
              <div className="flex items-center gap-2">
                <select className="bg-surface border border-border text-xs rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500">
                  <option>All Departments</option>
                  <option>HR</option>
                  <option>Operations</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ActivityList
                activities={activities}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={deleteActivity}
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border bg-surfaceHighlight/20">
              <CardTitle>Diversity Targets</CardTitle>
            </CardHeader>
            <div className="p-4 space-y-4">
              {[
                { label: 'Women in Leadership', actual: 38, target: 40 },
                { label: 'Pay Equity Gap', actual: 2.1, target: 0, invert: true },
                { label: 'Minority Representation', actual: 24, target: 25 },
              ].map((metric, i) => {
                const isWarning = metric.invert ? metric.actual > metric.target + 1 : metric.actual < metric.target;
                return (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[13px] font-medium text-textPrimary">{metric.label}</span>
                      <span className={`text-xs font-bold ${isWarning ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {metric.actual}{metric.invert ? '%' : '%'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surfaceHighlight rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min((metric.actual / (metric.target || 1)) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
              <Button variant="outline" size="sm" className="w-full mt-2">View Full Report</Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingActivity ? "Edit CSR Activity" : "Log New CSR Activity"}
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
