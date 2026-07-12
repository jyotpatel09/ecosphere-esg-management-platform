import React from 'react';
import { Card, CardContent } from '../../../shared/components/Card';
import type {  LucideIcon  } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: number | string;
  icon: React.ReactElement<LucideIcon>;
  colorClass: string;
  bgColorClass: string;
  suffix?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
}

export function KPICard({ label, value, icon, colorClass, bgColorClass, suffix, trend }: KPICardProps) {
  const trendColor =
    trend?.direction === 'up'
      ? 'text-success'
      : trend?.direction === 'down'
      ? 'text-danger'
      : 'text-textSecondary';

  const trendArrow =
    trend?.direction === 'up' ? '↑' : trend?.direction === 'down' ? '↓' : '→';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-textSecondary truncate">{label}</p>
            <h3 className="text-3xl font-bold text-textPrimary mt-2 tabular-nums">
              {value}
              {suffix && <span className="text-lg font-medium ml-1 text-textSecondary">{suffix}</span>}
            </h3>
            {trend && (
              <p className={`text-xs mt-2 font-medium ${trendColor}`}>
                {trendArrow} {trend.label}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${bgColorClass} ${colorClass} shrink-0 ml-4`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
