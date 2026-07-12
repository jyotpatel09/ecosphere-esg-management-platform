import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Clock, CheckCircle2, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../shared/components/Button';
import { toast } from 'sonner';

const trendData = [
  { month: 'Jan', score: 65, target: 70 }, { month: 'Feb', score: 68, target: 72 }, 
  { month: 'Mar', score: 72, target: 74 }, { month: 'Apr', score: 71, target: 76 }, 
  { month: 'May', score: 75, target: 78 }, { month: 'Jun', score: 78, target: 80 },
  { month: 'Jul', score: 81, target: 82 },
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary">Executive Command Center</h1>
          <p className="text-sm text-textSecondary mt-1">Real-time overview of your global ESG performance and pending actions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => toast.success('Report download started')}>Download Report</Button>
          <Button variant="primary" size="sm" onClick={() => toast.info('Create Plan feature coming soon')}>Create Action Plan</Button>
        </div>
      </div>
      
      {/* Executive KPI Strip */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Global ESG Index', val: '81.4', target: '82.0', trend: '+3.2%', up: true, status: 'On Track' },
          { title: 'Carbon Emissions', val: '14.2k', target: '15k', trend: '-2.4%', up: true, status: 'Ahead' },
          { title: 'Diversity Ratio', val: '42%', target: '45%', trend: '+0.8%', up: true, status: 'Lagging' },
          { title: 'Audit Compliance', val: '98%', target: '100%', trend: '-1.1%', up: false, status: 'Risk' },
        ].map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              kpi.status === 'On Track' || kpi.status === 'Ahead' ? 'bg-emerald-500' : 
              kpi.status === 'Risk' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">{kpi.title}</CardTitle>
                <Badge variant={kpi.status === 'Risk' ? 'danger' : kpi.status === 'Lagging' ? 'warning' : 'success'}>
                  {kpi.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-textPrimary tracking-tight">{kpi.val}</div>
                <div className="text-xs text-textSecondary font-medium">/ {kpi.target} target</div>
              </div>
              <div className={`flex items-center mt-2 text-xs font-semibold ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {kpi.up ? <TrendingUp className="h-3.5 w-3.5 mr-1" /> : <TrendingDown className="h-3.5 w-3.5 mr-1" />}
                {kpi.trend} vs last quarter
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Asymmetric Grid */}
      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4">
        
        {/* Left Column - High Priority Actions (Wider) */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-6">
          <Card className="flex flex-col h-full border-rose-500/20 shadow-rose-900/10">
            <CardHeader className="border-b border-border bg-rose-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                  <CardTitle className="text-rose-500">Requires Immediate Attention</CardTitle>
                </div>
                <Badge variant="danger">3 Critical Tasks</Badge>
              </div>
            </CardHeader>
            <div className="flex-1 divide-y divide-border">
              {[
                { title: 'Approve Q2 Carbon Offset Procurement', dept: 'Environment', time: 'Overdue by 2 days', type: 'Approval' },
                { title: 'Submit Diversity Metrics to Regulatory Board', dept: 'Social', time: 'Due today at 5 PM', type: 'Filing' },
                { title: 'Resolve Supplier Code of Conduct Violation', dept: 'Governance', time: 'Due in 24h', type: 'Audit' },
              ].map((task, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-surfaceHighlight/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-textPrimary truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="default">{task.type}</Badge>
                      <span className="text-xs text-textSecondary">{task.dept}</span>
                      <span className="text-textTertiary text-xs">•</span>
                      <span className="text-xs font-medium text-rose-400">{task.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 group">
                    Resolve <ArrowRight className="h-3 w-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center Column - Charts & Progress */}
        <div className="lg:col-span-1 xl:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader className="border-b border-border pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Trajectory</CardTitle>
                <p className="text-xs text-textSecondary mt-1">Actual vs Target ESG Score</p>
              </div>
              <select className="bg-surface border border-border text-xs rounded px-2 py-1 focus:ring-1 focus:ring-emerald-500">
                <option>YTD 2026</option>
                <option>Q2 2026</option>
              </select>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                    <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Leaderboard */}
        <Card className="lg:col-span-1">
          <CardHeader className="border-b border-border">
            <CardTitle>Department Rankings</CardTitle>
            <p className="text-xs text-textSecondary mt-1">Based on global sustainability metrics</p>
          </CardHeader>
          <div className="p-4 space-y-4">
            {[
              { name: 'Manufacturing', score: 92, trend: '+4', color: 'bg-emerald-500' },
              { name: 'Logistics', score: 85, trend: '+1', color: 'bg-emerald-400' },
              { name: 'Operations', score: 78, trend: '-2', color: 'bg-amber-500' },
              { name: 'Supply Chain', score: 64, trend: '-5', color: 'bg-rose-500' },
            ].map((dept, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-textTertiary w-4">{i + 1}</div>
                  <div className="text-sm font-medium text-textPrimary">{dept.name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-surfaceHighlight rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color}`} style={{ width: `${dept.score}%` }} />
                  </div>
                  <div className="text-xs font-semibold w-6 text-right">{dept.score}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border bg-surfaceHighlight/30 text-center">
            <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400">View Full Leaderboard</button>
          </div>
        </Card>

        {/* Recent Reports */}
        <Card className="lg:col-span-1">
          <CardHeader className="border-b border-border">
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <div className="divide-y divide-border">
            {[
              { title: 'Monthly Emissions Summary', date: 'Jul 10, 2026', type: 'PDF' },
              { title: 'Q2 Diversity & Inclusion Audit', date: 'Jul 05, 2026', type: 'XLSX' },
              { title: 'Supplier Compliance Matrix', date: 'Jul 01, 2026', type: 'PDF' },
            ].map((report, i) => (
              <div key={i} className="flex items-center gap-3 p-4 hover:bg-surfaceHighlight/30 transition-colors cursor-pointer group">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surfaceHighlight group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                  <FileText className="h-4 w-4 text-textSecondary group-hover:text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-textPrimary truncate">{report.title}</p>
                  <p className="text-[11px] text-textSecondary mt-0.5">{report.date} • {report.type}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-textTertiary group-hover:text-textPrimary" />
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="border-b border-border">
            <CardTitle>Live Activity Feed</CardTitle>
          </CardHeader>
          <div className="flex-1 p-5">
            <div className="relative border-l border-border ml-2 space-y-6">
              {[
                { user: 'Sarah Jenkins', action: 'uploaded Q1 Emissions Data', time: '10m ago', icon: CheckCircle2, color: 'text-emerald-500' },
                { user: 'System', action: 'flagged a supply chain discrepancy', time: '1h ago', icon: AlertTriangle, color: 'text-amber-500' },
                { user: 'Michael Chang', action: 'approved Governance Policy', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-500' },
              ].map((feed, i) => (
                <div key={i} className="relative pl-5">
                  <span className="absolute -left-[9px] top-0.5 h-4 w-4 rounded-full bg-surface border-2 border-surface flex items-center justify-center">
                    <feed.icon className={`h-3 w-3 ${feed.color}`} />
                  </span>
                  <p className="text-[13px] text-textPrimary">
                    <span className="font-semibold">{feed.user}</span> <span className="text-textSecondary">{feed.action}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-textTertiary">
                    <Clock className="h-3 w-3" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">{feed.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
