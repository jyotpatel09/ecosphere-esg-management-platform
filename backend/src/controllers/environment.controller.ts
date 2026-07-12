import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.carbonTransaction.findMany({
      include: { department: true },
      orderBy: { date: 'desc' },
      take: 10
    });

    const goals = await prisma.sustainabilityGoal.findMany({
      where: { status: 'ON_TRACK' },
      take: 5
    });

    const totalEmissions = transactions.reduce((acc, curr) => acc + (curr.emissions || 0), 0);

    res.json(formatSuccess('Environment dashboard data retrieved', {
      transactions,
      goals,
      metrics: {
        totalEmissions,
        activeGoals: goals.length,
        offsetCredits: 0
      }
    }));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch environment dashboard data', error));
  }
};

export const getEmissionFactors = async (req: Request, res: Response) => {
  try {
    const factors = await prisma.emissionFactor.findMany();
    res.json(formatSuccess('Emission factors retrieved', factors));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch emission factors', error));
  }
};

export const createCarbonTransaction = async (req: Request, res: Response) => {
  try {
    const { date, source, quantity, unit, departmentId } = req.body;

    // Find emission factor to auto-calculate emissions
    const factor = await prisma.emissionFactor.findUnique({
      where: { source }
    });

    let emissions = null;
    if (factor && factor.unit.includes(unit)) {
      emissions = quantity * factor.value;
    }

    const transaction = await prisma.carbonTransaction.create({
      data: {
        date: new Date(date),
        source,
        quantity,
        unit,
        emissions,
        departmentId
      },
      include: { department: true }
    });

    res.json(formatSuccess('Carbon transaction created', transaction));
  } catch (error) {
    res.status(500).json(formatError('Failed to create carbon transaction', error));
  }
};

export const getSustainabilityGoals = async (req: Request, res: Response) => {
  try {
    const goals = await prisma.sustainabilityGoal.findMany({
      include: { department: true },
      orderBy: { targetDate: 'asc' }
    });
    res.json(formatSuccess('Goals retrieved', goals));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch goals', error));
  }
};
