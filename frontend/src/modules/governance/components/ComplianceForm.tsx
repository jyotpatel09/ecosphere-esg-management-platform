import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ComplianceFormData, ComplianceIssue } from '../types/compliance';
import { Button } from '../../../shared/components/Button';

const complianceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  policy: z.string().min(2, 'Policy reference is required'),
  department: z.string().min(2, 'Department is required'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Open', 'In Progress', 'Resolved']),
  assignee: z.string().min(2, 'Assignee is required'),
  resolutionNotes: z.string().optional(),
});

interface ComplianceFormProps {
  initialData?: ComplianceIssue;
  onSubmit: (data: ComplianceFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ComplianceForm({ initialData, onSubmit, onCancel, isSubmitting }: ComplianceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      policy: initialData?.policy || '',
      department: initialData?.department || '',
      severity: initialData?.severity || 'Medium',
      status: initialData?.status || 'Open',
      assignee: initialData?.assignee || '',
      resolutionNotes: initialData?.resolutionNotes || '',
    },
  });

  const currentStatus = watch('status');

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        policy: initialData.policy,
        department: initialData.department,
        severity: initialData.severity,
        status: initialData.status,
        assignee: initialData.assignee,
        resolutionNotes: initialData.resolutionNotes || '',
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Related Policy</label>
          <input
            {...register('policy')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.policy && <p className="text-xs text-danger mt-1">{errors.policy.message}</p>}
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
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Assignee</label>
          <input
            {...register('assignee')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.assignee && <p className="text-xs text-danger mt-1">{errors.assignee.message}</p>}
        </div>
      </div>

      {currentStatus === 'Resolved' && (
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Resolution Notes</label>
          <textarea
            {...register('resolutionNotes')}
            rows={2}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Describe how this issue was resolved..."
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </form>
  );
}
