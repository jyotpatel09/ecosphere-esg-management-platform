import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { formatError } from '../utils/response';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    departmentId?: string | null;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    logger.warn('Authentication failed - No token provided', { path: req.originalUrl });
    return res.status(401).json(formatError('Unauthorized - No token provided'));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Authentication failed - Invalid token', { path: req.originalUrl });
    return res.status(401).json(formatError('Unauthorized - Invalid token'));
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Authorization failed - Required roles: ${roles.join(',')}, User role: ${req.user.role}`, { path: req.originalUrl });
      return res.status(403).json(formatError('Forbidden - Insufficient permissions'));
    }

    next();
  };
};
