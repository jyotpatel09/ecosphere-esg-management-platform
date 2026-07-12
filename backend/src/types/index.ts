// Global Backend Types
export interface User { id: string; role?: string; email?: string; firstName?: string; lastName?: string; departmentId?: string; }
export interface Role { id: string; }
export interface Department { id: string; }
export interface ApiResponse<T = any> { success: boolean; message: string; data?: T; error?: any; }
