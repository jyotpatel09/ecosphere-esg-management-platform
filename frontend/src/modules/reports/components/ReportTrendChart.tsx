import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ReportTrendPoint } from '../types/reportDashboard';
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface ReportTrendChartProps {
  data: ReportTrendPoint[];
}

export function ReportTrendChart({ data }: ReportTrendChartProps) {
  return (
    <ChartWrapper title="Monthly Reports Generated" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-surfaceHighlight, #334155)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
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
          formatter={(value: number) => [value, 'Reports Generated']}
          contentStyle={{
            backgroundColor: 'var(--color-surface, #1e293b)',
            border: '1px solid var(--color-surfaceHighlight, #334155)',
            borderRadius: '8px',
            color: 'var(--color-textPrimary, #f1f5f9)',
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="generated"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
          maxBarSize={48}
        />
      </BarChart>
    </ChartWrapper>
  );
}
