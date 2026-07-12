import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';

export function GamificationDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Gamification Module</h1>
      <Card>
        <CardHeader>
          <CardTitle>Challenges, Badges & Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-textSecondary">This module drives employee engagement via sustainability challenges and rewards.</p>
        </CardContent>
      </Card>
    </div>
  );
}
