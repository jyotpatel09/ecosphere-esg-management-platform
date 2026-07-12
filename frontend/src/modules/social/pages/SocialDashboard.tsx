import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';

export function SocialDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Social Module</h1>
      <Card>
        <CardHeader>
          <CardTitle>CSR & Employee Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-textSecondary">This module will manage CSR activities, employee participation, and diversity metrics.</p>
        </CardContent>
      </Card>
    </div>
  );
}
