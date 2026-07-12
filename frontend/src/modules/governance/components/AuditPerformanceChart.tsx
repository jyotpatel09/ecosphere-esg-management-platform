import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
<<<<<<< HEAD
import type {  AuditPerformancePoint  } from '../types/governanceKPI';
=======
import type { AuditPerformancePoint } from '../types/governanceKPI';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface AuditPerformanceChartProps {
  data: AuditPerformancePoint[];
}

const STATUS_COLORS: Record<string, string> = {
  Completed: '#22c55e',
  'In Progress': '#3b82f6',
  Scheduled: '#f59e0b',
  Cancelled: '#64748b',
};

export function AuditPerformanceChart({ data }: AuditPerformanceChartProps) {
  return (
    <ChartWrapper title="Audit Performance by Status" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={4}
          dataKey="count"
          nameKey="status"
        >
          {data.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status] ?? '#64748b'}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any, name: any) => [value, name]}
          contentStyle={{
            backgroundColor: 'var(--color-surface, #1e293b)',
            border: '1px solid var(--color-surfaceHighlight, #334155)',
            borderRadius: '8px',
            color: 'var(--color-textPrimary, #f1f5f9)',
            fontSize: 12,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: 'var(--color-textSecondary, #94a3b8)' }}
        />
      </PieChart>
    </ChartWrapper>
  );
}
