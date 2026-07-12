import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Award, Target, Users, Zap, Trophy, TrendingUp, RefreshCw, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGamification } from '../hooks/useGamification';
import { Skeleton } from '../../../shared/components/SkeletonLoader';
import { toast } from 'sonner';

const engagementData = [
  { week: 'W1', active: 45, target: 40 }, { week: 'W2', active: 52, target: 45 }, 
  { week: 'W3', active: 68, target: 50 }, { week: 'W4', active: 82, target: 55 },
];

export function GamificationDashboard() {
  const { data, leaderboard, isLoading, refetch } = useGamification();

  if (isLoading) return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 mb-2" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
      </div>
      <div className="flex gap-6"><Skeleton className="h-[500px] w-1/3" /><Skeleton className="h-[500px] flex-1" /></div>
    </div>
  );

  const metrics = [
    { title: 'Active Challenges', value: data?.metrics.activeChallenges || 12, change: '+2', status: 'On Track' },
    { title: 'Points Awarded', value: data?.metrics.pointsAwarded || '45.2k', change: '+12.5%', status: 'Ahead' },
    { title: 'Top Performers', value: data?.metrics.topPerformers || 24, change: '+4', status: 'On Track' },
    { title: 'Engagement Rate', value: `${data?.metrics.engagementRate || 82}%`, change: '+5%', status: 'Improving' }
  ];

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Employee Engagement</h1>
          <p className="text-sm text-textSecondary mt-1">Drive sustainability engagement through targeted challenges and rewards.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refetch}><RefreshCw className="h-4 w-4 mr-2" /> Refresh Data</Button>
          <Button variant="primary" size="sm" onClick={() => toast.info('New Challenge creation coming soon')}><Plus className="h-4 w-4 mr-1.5" /> New Challenge</Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <CardHeader className="pb-2 flex flex-row justify-between items-start">
              <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">{metric.title}</CardTitle>
              <Badge variant="success">{metric.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-textPrimary tracking-tight">{metric.value}</div>
              </div>
              <div className="flex items-center mt-2 text-xs font-semibold text-emerald-500">
                <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                {metric.change} this month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4 flex-1 min-h-0">
        {/* Left Column - Leaderboard */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-border py-4 bg-surfaceHighlight/20">
              <CardTitle>Global Leaderboard</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-y-auto p-0">
              <div className="divide-y divide-border">
                {leaderboard.map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 cursor-pointer transition-colors border-l-2 ${i < 3 ? 'bg-surfaceHighlight/30 border-emerald-500/50 hover:bg-surfaceHighlight/50' : 'hover:bg-surfaceHighlight/30 border-transparent hover:border-border'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        user.rank === 1 ? 'bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/30' :
                        user.rank === 2 ? 'bg-slate-300/20 text-slate-300 ring-1 ring-slate-300/30' :
                        user.rank === 3 ? 'bg-amber-700/20 text-amber-700 ring-1 ring-amber-700/30' :
                        'bg-surfaceHighlight text-textTertiary'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold shrink-0">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-textPrimary">{user.name}</p>
                        <p className="text-xs text-textSecondary">{user.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-textPrimary">{user.points}</p>
                      <p className={`text-[10px] font-medium uppercase tracking-wider ${user.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {user.trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 border-t border-border bg-surfaceHighlight/20 text-center">
              <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400">View Full Rankings</button>
            </div>
          </Card>
        </div>

        {/* Right Column - Charts & Activity */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader className="border-b border-border py-4 flex flex-row items-center justify-between bg-surfaceHighlight/20">
              <div>
                <CardTitle>Program Engagement Trajectory</CardTitle>
                <p className="text-xs text-textSecondary mt-0.5">Active participation rate across all departments</p>
              </div>
              <select className="bg-surface border border-border text-xs rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500">
                <option>This Month</option>
                <option>Last Quarter</option>
              </select>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTargetEngage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#475569" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="week" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '12px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="target" stroke="#475569" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorTargetEngage)" />
                    <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEngage)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
