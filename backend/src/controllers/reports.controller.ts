import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const data = {
      summary: {
        totalReports: 142,
        generatedReports: 128,
        pendingReports: 14,
        exportCount: 45
      },
      trend: [
        { month: 'Jan', generated: 12 },
        { month: 'Feb', generated: 19 },
        { month: 'Mar', generated: 15 },
        { month: 'Apr', generated: 22 },
        { month: 'May', generated: 30 },
        { month: 'Jun', generated: 45 },
      ],
      departmentDistribution: [
        { department: 'Engineering', count: 35 },
        { department: 'Manufacturing', count: 42 },
        { department: 'Logistics', count: 28 },
        { department: 'HR', count: 18 },
        { department: 'Finance', count: 19 },
      ],
      recentReports: [
        {
          id: '1',
          reportName: 'Q2 2026 ESG Summary',
          department: 'Global',
          type: 'ESG Summary',
          createdDate: '2026-07-01T10:00:00Z',
          status: 'Generated'
        },
        {
          id: '2',
          reportName: 'Supply Chain Carbon Audit',
          department: 'Logistics',
          type: 'Carbon Emissions',
          createdDate: '2026-07-10T14:30:00Z',
          status: 'Pending'
        },
        {
          id: '3',
          reportName: 'Diversity & Inclusion Metrics',
          department: 'HR',
          type: 'Social Impact',
          createdDate: '2026-06-28T09:15:00Z',
          status: 'Generated'
        },
        {
          id: '4',
          reportName: 'ISO 14001 Compliance Check',
          department: 'Manufacturing',
          type: 'Compliance',
          createdDate: '2026-07-11T11:45:00Z',
          status: 'Scheduled'
        }
      ]
    };

    res.json(formatSuccess('Reports dashboard data retrieved', data));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch reports dashboard data', error));
  }
};
