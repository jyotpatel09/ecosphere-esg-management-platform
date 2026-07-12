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
import type { ReportTrendPoint } from '../types/reportDashboard';
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface ReportTrendChartProps {
  data: ReportTrendPoint[];
}

export function ReportTrendChart({ data }: ReportTrendChartProps) {
  return (
    <ChartWrapper title="Monthly Reports Generated" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1e293b"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value: any) => [value, 'Reports']}
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '6px',
            color: '#f8fafc',
            fontSize: 12,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
          }}
          itemStyle={{ color: '#10b981' }}
        />
        <Bar
          dataKey="generated"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ChartWrapper>
  );
}
