import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { CorrectiveActionFormData, CorrectiveAction } from '../types/correctiveAction';
import { Button } from '../../../shared/components/Button';

const correctiveActionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  relatedIssue: z.string().min(2, 'Related issue is required'),
  department: z.string().min(2, 'Department is required'),
  assignedTo: z.string().min(2, 'Assignee is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Pending', 'In Progress', 'Completed', 'Overdue']),
  dueDate: z.string().min(1, 'Due date is required'),
});

interface CorrectiveActionFormProps {
  initialData?: CorrectiveAction;
  onSubmit: (data: CorrectiveActionFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CorrectiveActionForm({ initialData, onSubmit, onCancel, isSubmitting }: CorrectiveActionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CorrectiveActionFormData>({
    resolver: zodResolver(correctiveActionSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      relatedIssue: initialData?.relatedIssue || '',
      department: initialData?.department || '',
      assignedTo: initialData?.assignedTo || '',
      priority: initialData?.priority || 'Medium',
      status: initialData?.status || 'Pending',
      dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        relatedIssue: initialData.relatedIssue,
        department: initialData.department,
        assignedTo: initialData.assignedTo,
        priority: initialData.priority,
        status: initialData.status,
        dueDate: initialData.dueDate,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Related Issue</label>
          <input
            {...register('relatedIssue')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.relatedIssue && <p className="text-xs text-danger mt-1">{errors.relatedIssue.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Department</label>
          <input
            {...register('department')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.department && <p className="text-xs text-danger mt-1">{errors.department.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Assigned To</label>
          <input
            {...register('assignedTo')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.assignedTo && <p className="text-xs text-danger mt-1">{errors.assignedTo.message}</p>}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Priority</label>
          <select
            {...register('priority')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.priority && <p className="text-xs text-danger mt-1">{errors.priority.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Action' : 'Create Action'}
        </Button>
      </div>
    </form>
  );
}
