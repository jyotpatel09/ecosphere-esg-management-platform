import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '../shared/components/Button';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
        <SearchX className="h-10 w-10 text-warning" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-textPrimary sm:text-5xl">404</h1>
      <p className="mt-4 text-lg text-textSecondary">
        Page Not Found. The page you are looking for doesn't exist.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
