import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Settings,
  Building2,
  ChevronDown,
  LogOut,
  HelpCircle,
  Pin,
  Clock
} from 'lucide-react';
import { cn } from '../components/Button';
import { useAuthStore } from '../../store/authStore';

const mainModules = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, exact: true },
  { name: 'Environmental', href: '/environment', icon: Leaf },
  { name: 'Social', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: ShieldCheck },
  { name: 'Gamification', href: '/gamification', icon: Award },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const isActive = (itemHref: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === itemHref;
    }
    return location.pathname.startsWith(itemHref);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-surface border-r border-border shadow-sm z-10">
      {/* Workspace / Organization Switcher */}
      <div className="flex h-14 shrink-0 items-center px-4 border-b border-border">
        <button onClick={() => alert('Switching organizations will be available in V2.')} className="flex w-full items-center justify-between hover:bg-surfaceHighlight/50 p-1.5 -mx-1.5 rounded-md transition-colors group">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col items-start overflow-hidden text-left">
              <span className="text-sm font-semibold text-textPrimary leading-none truncate w-full">Acme Corp Global</span>
              <span className="text-[10px] text-textSecondary mt-1 uppercase tracking-wider font-medium">Enterprise</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-textTertiary group-hover:text-textSecondary shrink-0" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
        
        {/* Quick Access / Workflow */}
        <div>
          <div className="px-2 mb-2">
            <h3 className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Quick Access</h3>
          </div>
          <div className="space-y-0.5">
            <Link to="/" className={cn(
                'group flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200',
                isActive('/', true) 
                  ? 'bg-emerald-500/10 text-emerald-400 relative before:absolute before:inset-y-1 before:-left-3 before:w-1 before:bg-emerald-500 before:rounded-r'
                  : 'text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary'
              )}>
              <Pin className={cn(
                'mr-3 h-4 w-4 shrink-0',
                isActive('/', true) ? 'text-emerald-400' : 'text-textTertiary group-hover:text-textSecondary'
              )} />
              Executive Overview
            </Link>
            <Link to="/reports" className={cn(
                'group flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200',
                isActive('/reports') 
                  ? 'bg-emerald-500/10 text-emerald-400 relative before:absolute before:inset-y-1 before:-left-3 before:w-1 before:bg-emerald-500 before:rounded-r'
                  : 'text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary'
              )}>
              <Clock className={cn(
                'mr-3 h-4 w-4 shrink-0',
                isActive('/reports') ? 'text-emerald-400' : 'text-textTertiary group-hover:text-textSecondary'
              )} />
              Recent Reports
            </Link>
          </div>
        </div>

        {/* Core Modules */}
        <div>
          <div className="px-2 mb-2">
            <h3 className="text-[11px] font-bold text-textTertiary uppercase tracking-wider">Core Modules</h3>
          </div>
          <div className="space-y-0.5">
            {mainModules.slice(1).map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200',
                    active
                      ? 'bg-emerald-500/10 text-emerald-400 relative before:absolute before:inset-y-1 before:-left-3 before:w-1 before:bg-emerald-500 before:rounded-r'
                      : 'text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-4 w-4 shrink-0',
                      active ? 'text-emerald-400' : 'text-textTertiary group-hover:text-textSecondary'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Section & Settings */}
      <div className="shrink-0 p-3 border-t border-border bg-surfaceHighlight/20">
        <div className="space-y-0.5 mb-3">
          <Link to="/settings" className="group flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors">
            <Settings className="mr-3 h-4 w-4 text-textTertiary group-hover:text-textSecondary shrink-0" />
            Platform Settings
          </Link>
          <button onClick={() => alert('Documentation is coming soon')} className="w-full group flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary transition-colors">
            <HelpCircle className="mr-3 h-4 w-4 text-textTertiary group-hover:text-textSecondary shrink-0" />
            Documentation
          </button>
        </div>
        
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-surfaceHighlight/50 cursor-pointer transition-colors border border-transparent hover:border-border">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-200 font-bold text-xs ring-1 ring-white/10">
            {user?.firstName?.charAt(0) || 'A'}
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-xs font-semibold text-textPrimary truncate">{user?.firstName || 'Admin'} {user?.lastName || 'User'}</span>
            <span className="text-[10px] text-textSecondary truncate">{user?.email || 'admin@ecosphere.com'}</span>
          </div>
          <button onClick={logout} className="p-1.5 text-textTertiary hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
