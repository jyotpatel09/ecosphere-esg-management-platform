import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import type { CSRActivity } from '../types';
import { Button } from '../../../shared/components/Button';
import { SkeletonLoader } from '../../../shared/components/SkeletonLoader';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Pagination } from '../../../shared/components/Pagination';

interface ActivityListProps {
  activities: CSRActivity[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (activity: CSRActivity) => void;
}

export function ActivityList({ activities, isLoading, onDelete, onEdit }: ActivityListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredActivities = useMemo(() => {
    return (activities || []).filter((activity) => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (activity.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || activity.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activities, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <SkeletonLoader rows={5} />;
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'COMPLETED': return 'primary';
      case 'CANCELLED': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="bg-transparent border border-border rounded-md px-3 py-2 text-textPrimary text-sm focus:outline-none focus:border-textSecondary transition-colors w-full sm:w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          className="bg-transparent border border-border rounded-md px-3 py-2 text-textPrimary text-sm focus:outline-none focus:border-textSecondary transition-colors w-full sm:w-48 appearance-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {!filteredActivities.length ? (
        <EmptyState title="No Activities Found" description="Try adjusting your filters or search term." />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.title}</TableCell>
                  <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                  <TableCell>{activity.location || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(activity.status) as any}>{activity.status}</Badge>
                  </TableCell>
                  <TableCell>{activity.points}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(activity)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(activity.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
