import React, { Component } from 'react';
import type { ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
            <AlertTriangle className="h-10 w-10 text-danger" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-textPrimary sm:text-3xl">Something went wrong</h1>
          <p className="mt-4 max-w-lg text-sm text-textSecondary">
            {this.state.error?.message || 'An unexpected error occurred. Our team has been notified.'}
          </p>
          <div className="mt-8 flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
