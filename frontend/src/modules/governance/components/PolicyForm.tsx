import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
<<<<<<< HEAD
import type {  PolicyFormData, PolicyStatus, Policy  } from '../types/policy';
=======
import type { PolicyFormData, PolicyStatus, Policy } from '../types/policy';
>>>>>>> 1e4385f895625aba346926ef66dc3fd5520c4f70
import { Button } from '../../../shared/components/Button';

const policySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  owner: z.string().min(2, 'Owner is required'),
  department: z.string().min(2, 'Department is required'),
  status: z.enum(['Draft', 'Active', 'Under Review', 'Archived']),
  effectiveDate: z.string().min(1, 'Effective date is required'),
});

interface PolicyFormProps {
  initialData?: Policy;
  onSubmit: (data: PolicyFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function PolicyForm({ initialData, onSubmit, onCancel, isSubmitting }: PolicyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PolicyFormData>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || '',
      owner: initialData?.owner || '',
      department: initialData?.department || '',
      status: initialData?.status || 'Draft',
      effectiveDate: initialData?.effectiveDate || new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        owner: initialData.owner,
        department: initialData.department,
        status: initialData.status,
        effectiveDate: initialData.effectiveDate,
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Category</label>
          <input
            {...register('category')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.category && <p className="text-xs text-danger mt-1">{errors.category.message}</p>}
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Owner</label>
          <input
            {...register('owner')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.owner && <p className="text-xs text-danger mt-1">{errors.owner.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Archived">Archived</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Effective Date</label>
        <input
          type="date"
          {...register('effectiveDate')}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.effectiveDate && <p className="text-xs text-danger mt-1">{errors.effectiveDate.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Policy' : 'Create Policy'}
        </Button>
      </div>
    </form>
  );
}
