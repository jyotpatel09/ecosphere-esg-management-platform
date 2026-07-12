import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.user.findMany({
      include: { department: true },
      take: 10
    });

    // Mock points for demo purposes
    const mappedLeaderboard = leaderboard.map((user, index) => ({
      id: user.id,
      rank: index + 1,
      name: `${user.firstName} ${user.lastName}`,
      dept: user.department?.name || 'Unknown',
      points: Math.floor(Math.random() * 1000) + 500, // random points 500-1500
      trend: index % 2 === 0 ? '+120' : '-10',
      avatar: `${user.firstName[0]}${user.lastName[0]}`
    })).sort((a, b) => b.points - a.points).map((user, index) => ({...user, rank: index + 1}));

    res.json(formatSuccess('Leaderboard retrieved', mappedLeaderboard));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch leaderboard', error));
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    res.json(formatSuccess('Gamification dashboard data retrieved', {
      metrics: {
        activeChallenges: 12,
        pointsAwarded: '45.2k',
        topPerformers: 24,
        engagementRate: 82
      }
    }));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch gamification dashboard data', error));
  }
};
