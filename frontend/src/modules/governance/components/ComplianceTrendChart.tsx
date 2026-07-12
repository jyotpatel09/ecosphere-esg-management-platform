import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
<<<<<<< HEAD
import type {  ComplianceTrendPoint  } from '../types/governanceKPI';
=======
import type { ComplianceTrendPoint } from '../types/governanceKPI';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { ChartWrapper } from '../../../shared/components/ChartWrapper';

interface ComplianceTrendChartProps {
  data: ComplianceTrendPoint[];
}

export function ComplianceTrendChart({ data }: ComplianceTrendChartProps) {
  return (
    <ChartWrapper title="Compliance Score Trend" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surfaceHighlight, #334155)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12, fill: 'var(--color-textSecondary, #94a3b8)' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value: any) => [`${value}%`, 'Compliance Score']}
          contentStyle={{
            backgroundColor: 'var(--color-surface, #1e293b)',
            border: '1px solid var(--color-surfaceHighlight, #334155)',
            borderRadius: '8px',
            color: 'var(--color-textPrimary, #f1f5f9)',
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2.5}
          fill="url(#complianceGradient)"
          dot={{ fill: '#3b82f6', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ChartWrapper>
  );
}
