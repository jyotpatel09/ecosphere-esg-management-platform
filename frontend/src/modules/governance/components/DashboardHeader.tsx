import React from 'react';
import { Button } from '../../../shared/components/Button';
import { ShieldCheck } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Governance Dashboard</h1>
        <p className="text-textSecondary mt-1">Monitor ESG policies, compliance issues, and upcoming audits.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="primary" className="gap-2">
          <ShieldCheck className="h-4 w-4" />
          View Policies
        </Button>
      </div>
    </div>
  );
}
