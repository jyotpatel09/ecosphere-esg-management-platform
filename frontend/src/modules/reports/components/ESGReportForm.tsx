import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { ESGReportFormData, ESGReport } from '../types/esgReport';
import { Button } from '../../../shared/components/Button';

const esgReportSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  reportType: z.enum(['ESG Summary', 'Sustainability Report', 'Compliance Report', 'Carbon Report']),
  department: z.string().min(2, 'Department is required'),
  reportingPeriod: z.string().min(2, 'Reporting period is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['Draft', 'Generated', 'Reviewed', 'Published']),
});

interface ESGReportFormProps {
  initialData?: ESGReport;
  onSubmit: (data: ESGReportFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ESGReportForm({ initialData, onSubmit, onCancel, isSubmitting }: ESGReportFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ESGReportFormData>({
    resolver: zodResolver(esgReportSchema),
    defaultValues: {
      title: initialData?.title || '',
      reportType: initialData?.reportType || 'ESG Summary',
      department: initialData?.department || '',
      reportingPeriod: initialData?.reportingPeriod || '',
      description: initialData?.description || '',
      status: initialData?.status || 'Draft',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        reportType: initialData.reportType,
        department: initialData.department,
        reportingPeriod: initialData.reportingPeriod,
        description: initialData.description,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Report Title</label>
        <input
          {...register('title')}
          className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Report Type</label>
          <select
            {...register('reportType')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ESG Summary">ESG Summary</option>
            <option value="Sustainability Report">Sustainability Report</option>
            <option value="Compliance Report">Compliance Report</option>
            <option value="Carbon Report">Carbon Report</option>
          </select>
          {errors.reportType && <p className="text-xs text-danger mt-1">{errors.reportType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Draft">Draft</option>
            <option value="Generated">Generated</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Published">Published</option>
          </select>
          {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
        </div>
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
          <label className="block text-sm font-medium text-textPrimary mb-1">Reporting Period</label>
          <input
            {...register('reportingPeriod')}
            placeholder="e.g. Q2 2026, H1 2026, FY 2025"
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.reportingPeriod && <p className="text-xs text-danger mt-1">{errors.reportingPeriod.message}</p>}
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

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? 'Update Report' : 'Create Report'}
        </Button>
      </div>
    </form>
  );
}
