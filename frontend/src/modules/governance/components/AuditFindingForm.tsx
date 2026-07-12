import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type {  AuditFindingFormData, AuditFinding  } from '../types/auditFinding';
import { Button } from '../../../shared/components/Button';

const auditFindingSchema = z.object({
  auditName: z.string().min(2, 'Audit name is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  department: z.string().min(2, 'Department is required'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Open', 'Under Review', 'Resolved', 'Closed']),
  assignedTo: z.string().min(2, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  resolutionNotes: z.string().optional(),
});

interface AuditFindingFormProps {
  initialData?: AuditFinding;
  onSubmit: (data: AuditFindingFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function AuditFindingForm({ initialData, onSubmit, onCancel, isSubmitting }: AuditFindingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AuditFindingFormData>({
    resolver: zodResolver(auditFindingSchema),
    defaultValues: {
      auditName: initialData?.auditName || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      department: initialData?.department || '',
      severity: initialData?.severity || 'Medium',
      status: initialData?.status || 'Open',
      assignedTo: initialData?.assignedTo || '',
      dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
      resolutionNotes: initialData?.resolutionNotes || '',
    },
  });

  const currentStatus = watch('status');
  const showResolutionNotes = currentStatus === 'Resolved' || currentStatus === 'Closed';

  useEffect(() => {
    if (initialData) {
      reset({
        auditName: initialData.auditName,
        title: initialData.title,
        description: initialData.description,
        department: initialData.department,
        severity: initialData.severity,
        status: initialData.status,
        assignedTo: initialData.assignedTo,
        dueDate: initialData.dueDate,
        resolutionNotes: initialData.resolutionNotes || '',
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Related Audit</label>
          <input
            {...register('auditName')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Q3 Internal Environmental Audit"
          />
          {errors.auditName && <p className="text-xs text-danger mt-1">{errors.auditName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Finding Title</label>
          <input
            {...register('title')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.description && <p className="text-xs text-danger mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Department</label>
          <input
            {...register('department')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.department && <p className="text-xs text-danger mt-1">{errors.department.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Assigned To</label>
          <input
            {...register('assignedTo')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.assignedTo && <p className="text-xs text-danger mt-1">{errors.assignedTo.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Severity</label>
          <select
            {...register('severity')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.severity && <p className="text-xs text-danger mt-1">{errors.severity.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Due Date</label>
          <input
            type="date"
            {...register('dueDate')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.dueDate && <p className="text-xs text-danger mt-1">{errors.dueDate.message}</p>}
        </div>
      </div>

      {showResolutionNotes && (
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Resolution Notes</label>
          <textarea
            {...register('resolutionNotes')}
            rows={2}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Provide details on how this finding was addressed..."
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Finding' : 'Create Finding'}
        </Button>
      </div>
    </form>
  );
}
