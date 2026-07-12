import React, { useState } from 'react';
import { Bell, Search, Settings, HelpCircle, Layers, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export function TopNav() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 sm:px-6 relative">
      <div className="flex items-center flex-1 gap-x-4">
        {/* Environment / Module Switcher */}
        <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-border cursor-pointer" onClick={() => navigate('/')}>
          <Layers className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-semibold text-textPrimary tracking-tight hover:text-emerald-500 transition-colors">EcoSphere ERP</span>
        </div>

        {/* Command Center / Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textTertiary group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search or jump to... (Press Enter)"
              className="w-full bg-surfaceHighlight/40 hover:bg-surfaceHighlight/70 focus:bg-surface border border-transparent focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-[13px] text-textPrimary placeholder:text-textTertiary rounded-md pl-9 pr-4 py-1.5 focus:outline-none transition-all shadow-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-textSecondary bg-surface border border-border rounded shadow-sm">↵</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 ml-4">
        {/* Quick Actions */}
        <button type="button" onClick={() => alert('Help Center documentation is coming soon.')} className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-surfaceHighlight rounded-md transition-colors">
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => navigate('/settings')} className="p-1.5 text-textSecondary hover:text-textPrimary hover:bg-surfaceHighlight rounded-md transition-colors">
          <Settings className="h-4 w-4" aria-hidden="true" />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            type="button" 
            onClick={() => setShowNotifications(!showNotifications)}
            onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
            className="relative p-1.5 text-textSecondary hover:text-textPrimary hover:bg-surfaceHighlight rounded-md transition-colors mr-2"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                <span className="font-semibold text-textPrimary text-sm">Notifications</span>
                <span className="text-xs text-emerald-500 cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 border-b border-border hover:bg-surfaceHighlight/30 cursor-pointer">
                  <p className="text-xs font-semibold text-textPrimary">Audit Scheduled</p>
                  <p className="text-xs text-textSecondary mt-1">Your ISO 14001 compliance audit has been scheduled for next week.</p>
                  <p className="text-[10px] text-textTertiary mt-1">2 hours ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-surfaceHighlight/30 cursor-pointer">
                  <p className="text-xs font-semibold text-textPrimary">New Policy Published</p>
                  <p className="text-xs text-textSecondary mt-1">A new data privacy policy was published by HR.</p>
                  <p className="text-[10px] text-textTertiary mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block h-5 w-px bg-border mx-1" aria-hidden="true" />

        {/* Profile */}
        <div className="relative flex items-center gap-x-3 pl-2">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            onBlur={() => setTimeout(() => setShowProfile(false), 200)}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500 text-white font-bold text-xs ring-2 ring-background hover:ring-emerald-500/30 transition-all shadow-sm"
          >
            {user?.firstName?.charAt(0) || 'A'}
          </button>

          {showProfile && (
            <div className="absolute right-0 top-10 mt-2 w-56 bg-surface border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-textPrimary">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-textSecondary">{user?.email}</p>
              </div>
              <div className="py-1">
                <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 text-sm text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary flex items-center gap-2">
                  <User className="h-4 w-4" /> My Profile
                </button>
                <button onClick={() => navigate('/settings')} className="w-full text-left px-4 py-2 text-sm text-textSecondary hover:bg-surfaceHighlight hover:text-textPrimary flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Preferences
                </button>
              </div>
              <div className="py-1 border-t border-border">
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-surfaceHighlight flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
