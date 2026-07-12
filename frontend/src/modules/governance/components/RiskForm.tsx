import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { RiskFormData, Risk } from '../types/risk';
import { Button } from '../../../shared/components/Button';

const riskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['Environmental', 'Compliance', 'Operational', 'Financial', 'Governance']),
  department: z.string().min(2, 'Department is required'),
  owner: z.string().min(2, 'Owner is required'),
  likelihood: z.enum(['Rare', 'Possible', 'Likely', 'Almost Certain']),
  impact: z.enum(['Low', 'Medium', 'High', 'Critical']),
  mitigationPlan: z.string().optional(),
  status: z.enum(['Identified', 'Monitoring', 'Mitigated', 'Closed']),
});

interface RiskFormProps {
  initialData?: Risk;
  onSubmit: (data: RiskFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function RiskForm({ initialData, onSubmit, onCancel, isSubmitting }: RiskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RiskFormData>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || 'Operational',
      department: initialData?.department || '',
      owner: initialData?.owner || '',
      likelihood: initialData?.likelihood || 'Possible',
      impact: initialData?.impact || 'Medium',
      mitigationPlan: initialData?.mitigationPlan || '',
      status: initialData?.status || 'Identified',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        department: initialData.department,
        owner: initialData.owner,
        likelihood: initialData.likelihood,
        impact: initialData.impact,
        mitigationPlan: initialData.mitigationPlan || '',
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Risk Title</label>
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
          <select
            {...register('category')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Environmental">Environmental</option>
            <option value="Compliance">Compliance</option>
            <option value="Operational">Operational</option>
            <option value="Financial">Financial</option>
            <option value="Governance">Governance</option>
          </select>
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Risk Owner</label>
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
            <option value="Identified">Identified</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Mitigated">Mitigated</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Likelihood</label>
          <select
            {...register('likelihood')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Rare">Rare</option>
            <option value="Possible">Possible</option>
            <option value="Likely">Likely</option>
            <option value="Almost Certain">Almost Certain</option>
          </select>
          {errors.likelihood && <p className="text-xs text-danger mt-1">{errors.likelihood.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Impact</label>
          <select
            {...register('impact')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.impact && <p className="text-xs text-danger mt-1">{errors.impact.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Mitigation Plan</label>
        <textarea
          {...register('mitigationPlan')}
          rows={3}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe how this risk will be mitigated..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Risk' : 'Log Risk'}
        </Button>
      </div>
    </form>
  );
}
