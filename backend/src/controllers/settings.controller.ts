import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getSystemPreferences = async (req: Request, res: Response) => {
  try {
    // In a real app this would query a SystemPreferences table
    const preferences = {
      defaultRole: 'Employee',
      requireAdminApproval: true,
      dataRetentionDays: 365,
      enableSSO: false
    };
    res.json(formatSuccess('System preferences retrieved', preferences));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch system preferences', error));
  }
};

export const updateSystemPreferences = async (req: Request, res: Response) => {
  try {
    // In a real app this would update the SystemPreferences table
    const preferences = req.body;
    res.json(formatSuccess('System preferences updated', preferences));
  } catch (error) {
    res.status(500).json(formatError('Failed to update system preferences', error));
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { department: true, role: true }
    });
    res.json(formatSuccess('Users retrieved', users));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch users', error));
  }
};
