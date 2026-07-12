import React from 'react';
import { ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

interface ChartWrapperProps {
  title: string;
  children: React.ReactElement;
  height?: number | string;
}

export function ChartWrapper({ title, children, height = 300 }: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
