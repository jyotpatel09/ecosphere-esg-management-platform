import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';

export function ReportsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Reports Module</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-textSecondary">This module allows generating and exporting customized ESG reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
