import { CSRActivity, CreateCSRActivityDTO, UpdateCSRActivityDTO, SocialKPI } from './types';
import crypto from 'crypto';

// In-memory mock database for CSR Activities until Prisma schema is updated
let mockActivities: CSRActivity[] = [
  {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Annual beach cleanup event to protect local marine life.',
    date: new Date('2026-08-15T09:00:00Z'),
    status: 'ACTIVE',
    location: 'Sunny Beach',
    maxParticipants: 50,
    points: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Tree Planting',
    description: 'Planting 1000 trees in the local park.',
    date: new Date('2026-09-10T10:00:00Z'),
    status: 'DRAFT',
    location: 'City Park',
    maxParticipants: 100,
    points: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

let mockKPIs: SocialKPI = {
  id: 'kpi-1',
  period: '2026-Q3',
  totalVolunteerHours: 120,
  diversityScore: 85.5,
  communityInvestment: 25000,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class SocialRepository {
  async getActivities(): Promise<CSRActivity[]> {
    return mockActivities;
  }

  async getActivityById(id: string): Promise<CSRActivity | null> {
    return mockActivities.find(a => a.id === id) || null;
  }

  async createActivity(data: CreateCSRActivityDTO): Promise<CSRActivity> {
    const newActivity: CSRActivity = {
      id: crypto.randomUUID(),
      ...data,
      date: new Date(data.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockActivities.push(newActivity);
    return newActivity;
  }

  async updateActivity(id: string, data: UpdateCSRActivityDTO): Promise<CSRActivity | null> {
    const index = mockActivities.findIndex(a => a.id === id);
    if (index === -1) return null;

    const existing = mockActivities[index];
    const updated = {
      ...existing,
      ...data,
      date: data.date ? new Date(data.date) : existing.date,
      updatedAt: new Date(),
    };
    mockActivities[index] = updated;
    return updated;
  }

  async deleteActivity(id: string): Promise<boolean> {
    const initialLength = mockActivities.length;
    mockActivities = mockActivities.filter(a => a.id !== id);
    return mockActivities.length !== initialLength;
  }

  async getKPIs(): Promise<SocialKPI> {
    return mockKPIs;
  }
}

export const socialRepository = new SocialRepository();
