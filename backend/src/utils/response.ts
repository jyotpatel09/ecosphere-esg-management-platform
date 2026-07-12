export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: any;
}

export const formatSuccess = <T>(message: string, data: T = {} as T): SuccessResponse<T> => ({
  success: true,
  message,
  data,
});

export const formatError = (message: string, error: any = {}): ErrorResponse => ({
  success: false,
  message,
  error,
});
