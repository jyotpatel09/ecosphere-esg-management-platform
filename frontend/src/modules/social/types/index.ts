export interface CSRActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  location?: string;
  maxParticipants?: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface SocialKPI {
  id: string;
  period: string;
  totalVolunteerHours: number;
  diversityScore: number;
  communityInvestment: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCSRActivityDTO {
  title: string;
  description: string;
  date: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  location?: string;
  maxParticipants?: number;
  points: number;
}

export type UpdateCSRActivityDTO = Partial<CreateCSRActivityDTO>;
