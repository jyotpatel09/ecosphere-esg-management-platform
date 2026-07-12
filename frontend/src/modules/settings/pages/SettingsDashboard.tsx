import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';

export function SettingsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Settings Module</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configuration & Administration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-textSecondary">This module is for managing departments, users, roles, and global ESG settings.</p>
        </CardContent>
      </Card>
    </div>
  );
}
