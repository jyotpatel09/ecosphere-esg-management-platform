import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Executive Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Environmental Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">82 / 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Social Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">74 / 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Governance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">88 / 100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Overall ESG Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-textPrimary">81 / 100</div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholders for Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 min-h-[300px] flex items-center justify-center">
          <p className="text-textSecondary">Milestone Trend Chart Placeholder</p>
        </Card>
        <Card className="col-span-3 min-h-[300px] flex items-center justify-center">
          <p className="text-textSecondary">Department ESG Ranking Placeholder</p>
        </Card>
      </div>
    </div>
  );
}
