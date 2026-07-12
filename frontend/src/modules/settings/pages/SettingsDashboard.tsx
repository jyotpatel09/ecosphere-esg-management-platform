import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/Card';
import { Settings, Shield, Users, Building, Bell, Database, Save, Check } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { useSettings } from '../hooks/useSettings';
import { Skeleton } from '../../../shared/components/SkeletonLoader';

const settingsGroups = [
  { id: 'user', title: 'User Management', icon: Users },
  { id: 'org', title: 'Organization Structure', icon: Building },
  { id: 'security', title: 'Security & Access', icon: Shield },
  { id: 'data', title: 'Data Integrations', icon: Database },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'system', title: 'System Settings', icon: Settings }
];

export function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('user');
  const { preferences, users, isLoading, updatePreferences } = useSettings();
  const [localPrefs, setLocalPrefs] = useState<any>(null);

  React.useEffect(() => {
    if (preferences && !localPrefs) {
      setLocalPrefs(preferences);
    }
  }, [preferences, localPrefs]);

  const handleSave = () => {
    if (localPrefs) {
      updatePreferences(localPrefs);
    }
  };

  if (isLoading || !localPrefs) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-6">
          <Skeleton className="w-64 h-96" />
          <Skeleton className="flex-1 h-96" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary">Platform Settings</h1>
          <p className="text-sm text-textSecondary mt-1">Configure and manage EcoSphere globally.</p>
        </div>
        <Button size="sm" variant="outline">View Audit Logs</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[500px]">
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {settingsGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === group.id
                  ? 'bg-surfaceHighlight text-white'
                  : 'text-textSecondary hover:bg-surfaceHighlight/50 hover:text-textPrimary'
              }`}
            >
              <group.icon className={`h-4 w-4 ${activeTab === group.id ? 'text-white' : 'text-textTertiary'}`} />
              {group.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader className="border-b border-border py-4">
              <CardTitle>{settingsGroups.find(g => g.id === activeTab)?.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {activeTab === 'user' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1.5">Default Role for New Users</label>
                      <select 
                        value={localPrefs.defaultRole}
                        onChange={(e) => setLocalPrefs({...localPrefs, defaultRole: e.target.value})}
                        className="w-full h-8 bg-surface border border-border rounded-md px-3 text-sm text-textPrimary focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="Employee">Employee (Read-Only)</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <input 
                        type="checkbox" 
                        checked={localPrefs.requireAdminApproval}
                        onChange={(e) => setLocalPrefs({...localPrefs, requireAdminApproval: e.target.checked})}
                        className="h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary/20 focus:ring-offset-0" 
                      />
                      <label className="text-sm text-textPrimary">Require admin approval for new signups</label>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
                    <div className="text-xs text-textSecondary">{users.length} total users registered in the system.</div>
                  </div>
                </div>
              )}

              {activeTab !== 'user' && (
                <div className="flex flex-col items-center justify-center h-48 text-textSecondary text-sm">
                  <Settings className="h-8 w-8 text-textTertiary mb-3" />
                  Configuration options for {settingsGroups.find(g => g.id === activeTab)?.title} will appear here.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
