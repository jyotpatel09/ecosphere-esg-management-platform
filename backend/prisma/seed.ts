import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // 1. Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      permissions: JSON.stringify(['USER_CREATE', 'USER_READ', 'USER_UPDATE', 'USER_DELETE', 'ESG_DATA_WRITE', 'ESG_DATA_READ', 'REPORTS_GENERATE', 'SETTINGS_MANAGE']),
    },
  });

  const esgManagerRole = await prisma.role.upsert({
    where: { name: 'ESG_MANAGER' },
    update: {},
    create: {
      name: 'ESG_MANAGER',
      permissions: JSON.stringify(['USER_READ', 'ESG_DATA_WRITE', 'ESG_DATA_READ', 'REPORTS_GENERATE']),
    },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: 'EMPLOYEE' },
    update: {},
    create: {
      name: 'EMPLOYEE',
      permissions: JSON.stringify(['ESG_DATA_READ']),
    },
  });

  // 2. Departments
  const corpDept = await prisma.department.upsert({
    where: { code: 'CORP' },
    update: {},
    create: { name: 'Corporate', code: 'CORP' },
  });

  const mfgDept = await prisma.department.upsert({
    where: { code: 'MFG' },
    update: {},
    create: { name: 'Manufacturing', code: 'MFG' },
  });

  const itDept = await prisma.department.upsert({
    where: { code: 'IT' },
    update: {},
    create: { name: 'Information Technology', code: 'IT' },
  });

  // 3. Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecosphere.local' },
    update: {},
    create: {
      email: 'admin@ecosphere.local',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      roleId: adminRole.id,
      departmentId: corpDept.id,
    },
  });

  const esgManager = await prisma.user.upsert({
    where: { email: 'manager@ecosphere.local' },
    update: {},
    create: {
      email: 'manager@ecosphere.local',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      roleId: esgManagerRole.id,
      departmentId: mfgDept.id,
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@ecosphere.local' },
    update: {},
    create: {
      email: 'employee@ecosphere.local',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Smith',
      roleId: employeeRole.id,
      departmentId: itDept.id,
    },
  });

  // 4. Global ESG Score
  await prisma.eSGScore.create({
    data: {
      environmental: 82,
      social: 74,
      governance: 88,
      overall: 81.3,
    },
  });

  // 5. Department Scores
  await prisma.departmentScore.create({
    data: {
      departmentId: mfgDept.id,
      environmental: 75,
      social: 80,
      governance: 85,
      overall: 80,
      period: '2026-Q2',
    },
  });

  // 6. Config
  await prisma.configuration.upsert({
    where: { key: 'SYSTEM_SETTINGS' },
    update: {},
    create: {
      key: 'SYSTEM_SETTINGS',
      value: JSON.stringify({ theme: 'dark', notificationsEnabled: true }),
    },
  });

  // 7. Seed Environment Data
  await prisma.emissionFactor.create({
    data: {
      source: 'Electricity (Grid)',
      value: 0.5,
      unit: 'kgCO2e/kWh',
      description: 'Standard grid electricity emission factor'
    }
  });

  await prisma.sustainabilityGoal.create({
    data: {
      title: 'Reduce Energy Consumption',
      description: 'Reduce office electricity usage by 15%',
      targetDate: new Date('2026-12-31'),
      targetValue: 15,
      metric: 'Percentage',
      departmentId: corpDept.id
    }
  });

  // 8. Seed Social Data
  const activity = await prisma.cSRActivity.create({
    data: {
      title: 'Beach Cleanup 2026',
      description: 'Annual corporate beach cleanup event.',
      date: new Date('2026-08-15'),
      location: 'Santa Monica Beach',
      points: 100,
      status: 'ACTIVE'
    }
  });

  await prisma.employeeParticipation.create({
    data: {
      userId: employee.id,
      activityId: activity.id,
      status: 'REGISTERED'
    }
  });

  // 9. Seed Governance Data
  await prisma.policy.create({
    data: {
      title: 'Data Privacy Policy',
      description: 'Guidelines for handling customer and employee data.',
      category: 'Privacy',
      status: 'ACTIVE',
      version: '2.1'
    }
  });

  await prisma.complianceIssue.create({
    data: {
      title: 'Missing Vendor Certifications',
      description: 'Several key vendors are missing their ISO certifications.',
      severity: 'HIGH',
      status: 'OPEN',
      departmentId: mfgDept.id
    }
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
