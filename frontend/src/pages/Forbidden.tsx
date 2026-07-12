import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../shared/components/Button';

export function Forbidden() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
        <ShieldAlert className="h-10 w-10 text-danger" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-textPrimary sm:text-5xl">403</h1>
      <p className="mt-4 text-lg text-textSecondary">
        Access Denied. You do not have permission to view this page.
      </p>
      <div className="mt-8">
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
