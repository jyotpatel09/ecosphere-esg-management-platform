import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { formatError } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.originalUrl} - ${message}`, {
    stack: err.stack,
    body: req.body,
  });

  res.status(statusCode).json(formatError(message, process.env.NODE_ENV === 'development' ? err.stack : undefined));
};
