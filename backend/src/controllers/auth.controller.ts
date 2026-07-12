import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { env } from '../config/env';
import { formatSuccess, formatError } from '../utils/response';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json(formatError('Invalid credentials'));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json(formatError('Invalid credentials'));
    }

    const token = jwt.sign(
      { id: user.id, role: user.role.name, departmentId: user.departmentId },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json(formatSuccess('Login successful', {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        departmentId: user.departmentId,
      },
    }));
  } catch (error) {
    res.status(500).json(formatError('Login failed', error));
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        departmentId: true,
        role: { select: { name: true, permissions: true } },
      },
    });

    if (!user) {
      return res.status(404).json(formatError('User not found'));
    }

    res.json(formatSuccess('Profile retrieved successfully', user));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch profile', error));
  }
};
