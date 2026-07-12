// Global Frontend Types
export interface User { id: string; role?: string; email?: string; firstName?: string; lastName?: string; departmentId?: string; }
export interface Role { id: string; }
export interface Department { id: string; }
export interface ApiResponse<T = any> { success: boolean; message: string; data?: T; error?: any; }
export interface Pagination { page: number; limit: number; total: number; }
export interface Notification { id: string; }
export interface Dashboard { metrics: any; }

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}
