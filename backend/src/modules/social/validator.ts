import { z } from 'zod';

export const createCSRActivitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z.string().datetime(),
  status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED']).default('DRAFT'),
  location: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
  points: z.number().int().nonnegative().default(0),
});

export const updateCSRActivitySchema = createCSRActivitySchema.partial();
