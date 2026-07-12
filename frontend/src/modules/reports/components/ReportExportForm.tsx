import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { ReportExportFormData, ReportExportFormat } from '../types/reportExport';
import { Button } from '../../../shared/components/Button';
import { AlertCircle } from 'lucide-react';

const exportSchema = z.object({
  reportName: z.string().min(3, 'Report name is required'),
  exportFormat: z.enum(['PDF', 'Excel', 'CSV']),
  department: z.string().min(1, 'Department is required'),
  notes: z.string().optional(),
});

interface ReportExportFormProps {
  onSubmit: (data: ReportExportFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const DEPARTMENTS = ['Environment', 'HR', 'Operations', 'Supply Chain', 'Finance', 'Legal'];

export function ReportExportForm({ onSubmit, onCancel, isSubmitting }: ReportExportFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportExportFormData>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      exportFormat: 'PDF',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="reportName" className="block text-sm font-medium text-textPrimary mb-1">
            Report Name *
          </label>
          <input
            {...register('reportName')}
            id="reportName"
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 2024 Q1 Emissions"
          />
          {errors.reportName && (
            <p className="mt-1 text-sm text-danger flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.reportName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="exportFormat" className="block text-sm font-medium text-textPrimary mb-1">
              Format *
            </label>
            <select
              {...register('exportFormat')}
              id="exportFormat"
              className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
            {errors.exportFormat && (
              <p className="mt-1 text-sm text-danger flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.exportFormat.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-textPrimary mb-1">
              Department *
            </label>
            <select
              {...register('department')}
              id="department"
              className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-danger flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.department.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-textPrimary mb-1">
            Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            id="notes"
            rows={3}
            className="w-full rounded-md border border-surfaceHighlight bg-surface px-3 py-2 text-sm text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Any specific instructions for this export..."
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-surfaceHighlight">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Requesting...' : 'Request Export'}
        </Button>
      </div>
    </form>
  );
}
