import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.cSRActivity.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(formatSuccess('Activities retrieved', activities));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch activities', error));
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const activity = await prisma.cSRActivity.findUnique({
      where: { id }
    });
    if (!activity) {
      return res.status(404).json(formatError('Activity not found'));
    }
    res.json(formatSuccess('Activity retrieved', activity));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch activity', error));
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, points, status } = req.body;
    const activity = await prisma.cSRActivity.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        points: parseInt(points, 10),
        status
      }
    });
    res.status(201).json(formatSuccess('Activity created', activity));
  } catch (error) {
    res.status(500).json(formatError('Failed to create activity', error));
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, date, location, points, status } = req.body;
    const activity = await prisma.cSRActivity.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        location,
        points: parseInt(points, 10),
        status
      }
    });
    res.json(formatSuccess('Activity updated', activity));
  } catch (error) {
    res.status(500).json(formatError('Failed to update activity', error));
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.cSRActivity.delete({
      where: { id }
    });
    res.json(formatSuccess('Activity deleted', null));
  } catch (error) {
    res.status(500).json(formatError('Failed to delete activity', error));
  }
};

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.cSRActivity.findMany();
    
    // Calculate mock KPIs based on actual activities
    const totalVolunteerHours = activities.length * 15;
    const diversityScore = 78;
    const communityInvestment = activities.reduce((acc, curr) => acc + (curr.points * 50), 0);

    res.json(formatSuccess('KPIs retrieved', {
      totalVolunteerHours,
      diversityScore,
      communityInvestment,
      period: 'YTD 2026'
    }));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch KPIs', error));
  }
};
