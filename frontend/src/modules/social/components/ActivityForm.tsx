import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { socialApi } from '../api';
import type { CSRActivity, CreateCSRActivityDTO } from '../types';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description needs to be at least 10 chars'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
  location: z.string().optional(),
  points: z.number().min(0).default(0),
});

type FormValues = z.infer<typeof schema>;

interface ActivityFormProps {
  activity?: CSRActivity | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ActivityForm({ activity, onSuccess, onCancel }: ActivityFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: activity ? {
      title: activity.title,
      description: activity.description,
      date: new Date(activity.date).toISOString().slice(0, 16),
      status: activity.status,
      location: activity.location || '',
      points: activity.points,
    } : {
      status: 'DRAFT',
      points: 0,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: CreateCSRActivityDTO = {
        ...data,
        date: new Date(data.date).toISOString()
      };
      
      if (activity) {
        await socialApi.updateActivity(activity.id, payload);
        toast.success('Activity updated');
      } else {
        await socialApi.createActivity(payload);
        toast.success('Activity created');
      }
      onSuccess();
    } catch (err) {
      toast.error('Failed to save activity');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-textSecondary mb-1">Title</label>
        <input {...register('title')} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary" />
        {errors.title && <p className="text-danger text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-textSecondary mb-1">Description</label>
        <textarea {...register('description')} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary h-24" />
        {errors.description && <p className="text-danger text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Date</label>
          <input type="datetime-local" {...register('date')} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary" />
          {errors.date && <p className="text-danger text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Status</label>
          <select {...register('status')} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Location</label>
          <input {...register('location')} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-1">Points</label>
          <input type="number" {...register('points', { valueAsNumber: true })} className="w-full bg-surfaceHighlight border border-surfaceHighlight rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isSubmitting}>Save</Button>
      </div>
    </form>
  );
}
