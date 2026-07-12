import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuditFormData, Audit } from '../types/audit';
import { Button } from '../../../shared/components/Button';

const auditSchema = z.object({
  auditName: z.string().min(3, 'Audit name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  department: z.string().min(2, 'Department is required'),
  auditor: z.string().min(2, 'Auditor is required'),
  auditType: z.enum(['Internal', 'External', 'Compliance', 'ESG Review']),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']),
});

interface AuditFormProps {
  initialData?: Audit;
  onSubmit: (data: AuditFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function AuditForm({ initialData, onSubmit, onCancel, isSubmitting }: AuditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      auditName: initialData?.auditName || '',
      description: initialData?.description || '',
      department: initialData?.department || '',
      auditor: initialData?.auditor || '',
      auditType: initialData?.auditType || 'Internal',
      scheduledDate: initialData?.scheduledDate || new Date().toISOString().split('T')[0],
      status: initialData?.status || 'Scheduled',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        auditName: initialData.auditName,
        description: initialData.description,
        department: initialData.department,
        auditor: initialData.auditor,
        auditType: initialData.auditType,
        scheduledDate: initialData.scheduledDate,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Audit Name</label>
        <input
          {...register('auditName')}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.auditName && <p className="text-xs text-danger mt-1">{errors.auditName.message}</p>}
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Auditor</label>
          <input
            {...register('auditor')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.auditor && <p className="text-xs text-danger mt-1">{errors.auditor.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Audit Type</label>
          <select
            {...register('auditType')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="Compliance">Compliance</option>
            <option value="ESG Review">ESG Review</option>
          </select>
          {errors.auditType && <p className="text-xs text-danger mt-1">{errors.auditType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Scheduled Date</label>
          <input
            type="date"
            {...register('scheduledDate')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.scheduledDate && <p className="text-xs text-danger mt-1">{errors.scheduledDate.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Audit' : 'Schedule Audit'}
        </Button>
      </div>
    </form>
  );
}
