export interface EmissionFactor {
  id: string;
  source: string;
  category: string;
  value: number;
  unit: string;
  region?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

export interface CarbonTransaction {
  id: string;
  departmentId: string;
  userId: string;
  emissionFactorId: string;
  quantity: number;
  date: string;
  description?: string | null;
  calculatedCO2e: number;
  createdAt: string;
  emissionFactor?: EmissionFactor;
  department?: Department;
}

export interface SustainabilityGoal {
  id: string;
  departmentId?: string | null;
  title: string;
  description?: string | null;
  targetValue: number;
  currentValue: number;
  metric: string;
  targetDate: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'ACHIEVED';
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentMetrics {
  totalEmissions: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

export interface EnvironmentDashboardData {
  metrics: EnvironmentMetrics;
  transactions: CarbonTransaction[];
  goals: SustainabilityGoal[];
}

export interface CreateCarbonTransactionPayload {
  departmentId: string;
  userId: string;
  emissionFactorId: string;
  quantity: number;
  date: string;
  description?: string;
}

export interface CreateSustainabilityGoalPayload {
  departmentId?: string;
  title: string;
  description?: string;
  targetValue: number;
  metric: string;
  targetDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
