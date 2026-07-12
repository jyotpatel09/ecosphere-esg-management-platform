import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';

export function EnvironmentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Environmental Module</h1>
      <Card>
        <CardHeader>
          <CardTitle>Emissions Tracking & Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-textSecondary">This module will contain emission tracking, carbon transactions, and environmental goals.</p>
        </CardContent>
      </Card>
    </div>
  );
}
