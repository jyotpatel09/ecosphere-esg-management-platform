export const ROLES = {
  ADMIN: 'ADMIN',
  ESG_MANAGER: 'ESG_MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  AUDITOR: 'AUDITOR',
} as const;

export type Role = keyof typeof ROLES;
