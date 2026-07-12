import { Request, Response } from 'express';
import prisma from '../config/db';
import { formatSuccess, formatError } from '../utils/response';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const policies = await prisma.policy.findMany({ take: 5 });
    const issues = await prisma.complianceIssue.findMany({
      where: { status: 'OPEN' },
      include: { department: true }
    });
    
    // We don't have Audit model in SQLite schema for this simple demo, but we'll mock recent audits
    const recentAudits = [
      { id: '1', auditName: 'Annual ISO 14001', department: 'Manufacturing', scheduledDate: '2026-10-15', status: 'PLANNED' },
      { id: '2', auditName: 'Data Privacy Review', department: 'IT', scheduledDate: '2026-08-22', status: 'ONGOING' }
    ];

    res.json(formatSuccess('Governance dashboard data retrieved', {
      recentAudits,
      recentComplianceIssues: issues.map((i: any) => ({
        id: i.id,
        issue: i.title,
        department: i.department?.name || 'Global',
        severity: i.severity,
        status: i.status
      })),
      kpis: {
        totalPolicies: policies.length,
        openComplianceIssues: issues.length,
        upcomingAudits: 2,
        highRisks: issues.filter((i: any) => i.severity === 'HIGH' || i.severity === 'CRITICAL').length
      }
    }));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch governance dashboard data', error));
  }
};

export const getPolicies = async (req: Request, res: Response) => {
  try {
    const policies = await prisma.policy.findMany();
    res.json(formatSuccess('Policies retrieved', policies));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch policies', error));
  }
};

export const getComplianceIssues = async (req: Request, res: Response) => {
  try {
    const issues = await prisma.complianceIssue.findMany({
      include: { department: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(formatSuccess('Compliance issues retrieved', issues));
  } catch (error) {
    res.status(500).json(formatError('Failed to fetch compliance issues', error));
  }
};
