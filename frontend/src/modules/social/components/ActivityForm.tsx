import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Label } from '../../../shared/components/Label';
import { Textarea } from '../../../shared/components/Textarea';
import { Select } from '../../../shared/components/Select';
import { socialApi } from '../api';
import type { CSRActivity, CreateCSRActivityDTO } from '../types';
import { toast } from 'sonner';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description needs to be at least 10 chars'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
  location: z.string().optional(),
  points: z.number().min(0),
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
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title"
          {...register('title')} 
          placeholder="e.g. Annual Beach Clean-up"
          error={errors.title?.message}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          {...register('description')} 
          placeholder="Describe the activity..."
          error={errors.description?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input 
            id="date"
            type="datetime-local" 
            {...register('date')} 
            error={errors.date?.message}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select 
            id="status"
            {...register('status')}
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location (Optional)</Label>
          <Input 
            id="location"
            {...register('location')} 
            placeholder="e.g. Seattle HQ"
          />
        </div>
        <div>
          <Label htmlFor="points">Points Awarded</Label>
          <Input 
            id="points"
            type="number" 
            {...register('points', { valueAsNumber: true })} 
            error={errors.points?.message}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-border mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>Save Activity</Button>
      </div>
    </form>
  );
}
