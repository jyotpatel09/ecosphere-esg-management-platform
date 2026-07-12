import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { cn } from '../components/Button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, exact: true },
  { name: 'Environmental', href: '/environment', icon: Leaf },
  { name: 'Social', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: ShieldCheck },
  { name: 'Gamification', href: '/gamification', icon: Award }, // Optional future module based on mockups
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (itemHref: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === itemHref;
    }
    return location.pathname.startsWith(itemHref);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-surface border-r border-surfaceHighlight">
      <div className="flex h-16 items-center px-6 border-b border-surfaceHighlight">
        <h1 className="text-xl font-bold text-primary">EcoSphere</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  active ? 'text-primary' : 'text-textSecondary group-hover:text-textPrimary'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-surfaceHighlight">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-textPrimary">Current Version</p>
            <p className="text-xs font-medium text-textSecondary">v1.0.0-beta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
