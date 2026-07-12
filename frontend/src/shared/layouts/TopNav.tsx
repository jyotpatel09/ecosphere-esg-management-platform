import React from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../components/Button';

export function TopNav() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-surfaceHighlight bg-surface px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-textSecondary hover:text-textPrimary">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-surfaceHighlight" aria-hidden="true" />

          {/* Profile dropdown / actions */}
          <div className="flex items-center gap-x-4">
            <span className="hidden lg:flex lg:items-center">
              <UserCircle className="h-8 w-8 text-textSecondary" />
              <span className="ml-4 text-sm font-semibold leading-6 text-textPrimary" aria-hidden="true">
                {user?.firstName} {user?.lastName}
              </span>
            </span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
