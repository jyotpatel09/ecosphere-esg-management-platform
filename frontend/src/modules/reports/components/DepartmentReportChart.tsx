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
  '#10b981', // Emerald 500
  '#3b82f6', // Blue 500
  '#f59e0b', // Amber 500
  '#8b5cf6', // Violet 500
  '#f43f5e', // Rose 500
  '#06b6d4', // Cyan 500
];

export function DepartmentReportChart({ data }: DepartmentReportChartProps) {
  return (
    <ChartWrapper title="Reports by Department" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1e293b"
          horizontal={false}
        />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 11, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="department"
          width={80}
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
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={16}>
          {data.map((_, index) => (
            <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartWrapper>
  );
}
