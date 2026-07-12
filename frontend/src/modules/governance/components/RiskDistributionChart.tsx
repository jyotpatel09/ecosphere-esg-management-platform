import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
<<<<<<< HEAD
import type {  RiskDistributionPoint  } from '../types/governanceKPI';
=======
import type { RiskDistributionPoint } from '../types/governanceKPI';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface RiskDistributionChartProps {
  data: RiskDistributionPoint[];
}

const SEVERITY_COLORS: Record<string, string> = {
  Low: '#22c55e',
  Medium: '#3b82f6',
  High: '#f59e0b',
  Critical: '#ef4444',
};

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  return (
    <ChartWrapper title="Risk Distribution by Severity" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surfaceHighlight, #334155)" vertical={false} />
        <XAxis
          dataKey="severity"
          tick={{ fontSize: 12, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip
          formatter={(value: any) => [value, 'Risks']}
          contentStyle={{
            backgroundColor: 'var(--color-surface, #1e293b)',
            border: '1px solid var(--color-surfaceHighlight, #334155)',
            borderRadius: '8px',
            color: 'var(--color-textPrimary, #f1f5f9)',
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell
              key={entry.severity}
              fill={SEVERITY_COLORS[entry.severity] ?? '#64748b'}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
}
