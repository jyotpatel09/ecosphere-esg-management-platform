import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from './Button';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-textSecondary hover:text-textPrimary"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-surfaceHighlight" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="ml-1 text-sm font-medium text-textSecondary hover:text-textPrimary md:ml-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-1 text-sm font-medium text-textPrimary md:ml-2">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
