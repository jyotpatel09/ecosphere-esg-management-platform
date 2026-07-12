export const API_ROUTES = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    PROFILE: '/profile',
  },
  DASHBOARD: {
    BASE: '/dashboard',
    OVERVIEW: '/overview',
  },
  ENVIRONMENT: {
    BASE: '/environment',
    METRICS: '/metrics',
  },
  SOCIAL: {
    BASE: '/social',
    METRICS: '/metrics',
  },
  GOVERNANCE: {
    BASE: '/governance',
    METRICS: '/metrics',
  },
  REPORTS: {
    BASE: '/reports',
    LIST: '/list',
  },
  SETTINGS: {
    BASE: '/settings',
    CONFIG: '/config',
  },
} as const;
