import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { DepartmentReportPoint } from '../types/reportDashboard';
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface DepartmentReportChartProps {
  data: DepartmentReportPoint[];
}

const BAR_COLORS = [
  '#3b82f6',
  '#22c55e',
  '#f59e0b',
  '#8b5cf6',
  '#ef4444',
  '#14b8a6',
];

export function DepartmentReportChart({ data }: DepartmentReportChartProps) {
  return (
    <ChartWrapper title="Reports by Department" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-surfaceHighlight, #334155)"
          horizontal={false}
        />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 12, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="department"
          width={90}
          tick={{ fontSize: 11, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value: number) => [value, 'Reports']}
          contentStyle={{
            backgroundColor: 'var(--color-surface, #1e293b)',
            border: '1px solid var(--color-surfaceHighlight, #334155)',
            borderRadius: '8px',
            color: 'var(--color-textPrimary, #f1f5f9)',
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={20}>
          {data.map((_, index) => (
            <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
}
