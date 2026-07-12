import React from 'react';
import { Button } from '../../../shared/components/Button';
import { ShieldCheck, Download, Plus } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Corporate Governance</h1>
        <p className="text-sm text-textSecondary mt-1">Monitor ESG policies, manage compliance issues, and track upcoming audits.</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Log
        </Button>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          New Policy
        </Button>
      </div>
    </div>
  );
}
