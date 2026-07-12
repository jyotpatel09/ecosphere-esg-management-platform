import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Leaf, Droplets, Wind, Zap, FileText, RefreshCw, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEnvironmentDashboard } from '../hooks/useEnvironmentDashboard';
import { Skeleton } from '../../../shared/components/SkeletonLoader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { toast } from 'sonner';

const emissionData = [
  { month: 'Jan', value: 1200, target: 1250 }, { month: 'Feb', value: 1150, target: 1200 }, 
  { month: 'Mar', value: 1100, target: 1150 }, { month: 'Apr', value: 1120, target: 1100 }, 
  { month: 'May', value: 1080, target: 1050 }, { month: 'Jun', value: 1050, target: 1000 },
];

export function EnvironmentDashboard() {
  const { data, loading, error, refresh } = useEnvironmentDashboard();

  if (loading) return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
      <div className="flex gap-6"><Skeleton className="h-[400px] w-1/3" /><Skeleton className="h-[400px] flex-1" /></div>
    </div>
  );

  if (error || !data) return <EmptyState icon={<AlertCircle className="h-8 w-8" />} title="Failed to load dashboard" description="Unable to connect to backend" />;

  const metrics = [
    { title: 'Total CO2 Emissions', value: `${data.metrics.totalEmissions.toFixed(1)}t`, change: '-2.4%', up: false, status: 'Ahead' },
    { title: 'Active Sustainability Goals', value: data.metrics.activeGoals, change: '+1', up: true, status: 'On Track' },
    { title: 'Water Usage (Estimated)', value: '120k L', change: '+0.5%', up: true, status: 'Warning' },
    { title: 'Carbon Offset Credits', value: `${data.metrics.offsetCredits}t`, change: '0%', up: true, status: 'On Track' }
  ];

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Environmental Operations</h1>
          <p className="text-sm text-textSecondary mt-1">Facility-level emission tracking, resource efficiency, and compliance status.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4 mr-2" /> Refresh Data</Button>
          <Button variant="primary" size="sm" onClick={() => toast.info('Compliance Report generation started')}><FileText className="h-4 w-4 mr-2" /> Compliance Report</Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">{metric.title}</CardTitle>
                <Badge variant={metric.status === 'Warning' ? 'warning' : 'success'}>{metric.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-textPrimary tracking-tight">{metric.value}</div>
              </div>
              <div className={`flex items-center mt-2 text-xs font-semibold ${metric.status === 'Warning' ? 'text-amber-500' : 'text-emerald-500'}`}>
                {metric.change} vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Master List (Left Pane) */}
        <Card className="flex flex-col lg:w-1/3 min-h-[400px]">
          <CardHeader className="border-b border-border py-4 bg-surfaceHighlight/20">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions & Goals</CardTitle>
            </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h4 className="text-xs font-bold text-textTertiary uppercase tracking-wider mb-2">Goals</h4>
            {data.goals.map((goal: any) => (
              <div key={goal.id} className="p-3 bg-surfaceHighlight/30 rounded-md border border-border">
                <p className="text-sm font-semibold text-textPrimary">{goal.title}</p>
                <p className="text-xs text-textSecondary">{goal.description}</p>
                <Badge className="mt-2 text-[10px]" variant="success">{goal.status}</Badge>
              </div>
            ))}
            
            <h4 className="text-xs font-bold text-textTertiary uppercase tracking-wider mt-4 mb-2">Transactions</h4>
            {data.transactions.length === 0 && <p className="text-xs text-textSecondary">No transactions yet.</p>}
            {data.transactions.map((tx: any) => (
              <div key={tx.id} className="p-3 bg-surfaceHighlight/10 rounded-md border border-border">
                <p className="text-sm font-semibold text-textPrimary">{tx.source}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-textSecondary">{tx.quantity} {tx.unit}</span>
                  <span className="text-xs font-bold text-emerald-500">{tx.emissions ? `${tx.emissions}t` : 'Calculating...'}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Detail View (Right Pane) */}
        <Card className="flex flex-col flex-1 min-h-[400px]">
          <CardHeader className="border-b border-border py-4 flex flex-row items-center justify-between bg-surfaceHighlight/20">
            <div>
              <CardTitle>Enterprise Trajectory</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-textSecondary">Global</span>
                <span className="text-textTertiary">•</span>
                <span className="text-xs text-textSecondary">All Departments</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-textPrimary">Emissions Trajectory (tCO2e)</h3>
              <select className="bg-surface border border-border text-xs rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500">
                <option>YTD 2026</option>
                <option>Q2 2026</option>
              </select>
            </div>
            <div className="h-[250px] w-full lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emissionData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="target" stroke="#475569" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTarget)" />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
