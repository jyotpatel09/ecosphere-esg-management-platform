# Database Changes Proposal

This document outlines the required database changes for the Governance, Reports, and Settings modules. It serves as a schema design guide for the Tech Lead to implement the actual Prisma schema updates.

---

## 1. Governance

### Model: Policy
- **Purpose**: Stores ESG policies that the organization must comply with.
- **Fields**:
  - `id`: String (UUID)
  - `title`: String
  - `description`: String
  - `version`: String
  - `status`: String (e.g., DRAFT, ACTIVE, ARCHIVED)
  - `effectiveDate`: DateTime
  - `createdAt`: DateTime
  - `updatedAt`: DateTime
- **Relationships**:
  - Authored by `User` (authorId)
  - Has many `ComplianceIssue`s
- **Indexes**: Index on `status`, `effectiveDate`.
- **Constraints**: `title` must be unique per `version`.
- **Validation notes**: `effectiveDate` cannot be in the past for new DRAFT policies.
- **Reason the model is required**: Needed to track organizational ESG guidelines and their lifecycle.

### Model: ComplianceIssue
- **Purpose**: Logs identified breaches or non-compliances against policies.
- **Fields**:
  - `id`: String (UUID)
  - `title`: String
  - `description`: String
  - `severity`: String (LOW, MEDIUM, HIGH, CRITICAL)
  - `status`: String (OPEN, INVESTIGATING, RESOLVED, CLOSED)
  - `reportedAt`: DateTime
  - `resolvedAt`: DateTime (nullable)
- **Relationships**:
  - Belongs to `Policy` (policyId)
  - Reported by `User` (reporterId)
  - Has many `CorrectiveAction`s
- **Indexes**: Index on `status`, `severity`, `policyId`.
- **Constraints**: None.
- **Validation notes**: `resolvedAt` must be set when status is RESOLVED or CLOSED.
- **Reason the model is required**: Crucial for compliance management and tracking ESG infractions.

### Model: CorrectiveAction
- **Purpose**: Defines actions taken to resolve a ComplianceIssue or AuditFinding.
- **Fields**:
  - `id`: String (UUID)
  - `description`: String
  - `status`: String (PENDING, IN_PROGRESS, COMPLETED)
  - `dueDate`: DateTime
  - `completedAt`: DateTime (nullable)
- **Relationships**:
  - Assigned to `User` (assigneeId)
  - Belongs to `ComplianceIssue` (nullable)
  - Belongs to `AuditFinding` (nullable)
- **Indexes**: Index on `assigneeId`, `status`.
- **Constraints**: Must belong to either a `ComplianceIssue` or an `AuditFinding`.
- **Validation notes**: `completedAt` required when status is COMPLETED.
- **Reason the model is required**: Necessary to prove remediation of risks and compliance breaches.

### Model: Audit
- **Purpose**: Represents a formal internal or external ESG audit.
- **Fields**:
  - `id`: String (UUID)
  - `name`: String
  - `type`: String (INTERNAL, EXTERNAL)
  - `status`: String (PLANNED, ONGOING, COMPLETED, CANCELLED)
  - `startDate`: DateTime
  - `endDate`: DateTime (nullable)
- **Relationships**:
  - Managed by `User` (leadAuditorId)
  - Has many `AuditFinding`s
  - Has one `AuditSchedule` (optional)
- **Indexes**: Index on `status`, `type`.
- **Constraints**: `name` must be unique per year.
- **Validation notes**: `endDate` must be >= `startDate`.
- **Reason the model is required**: Essential for the Internal Audits feature.

### Model: AuditSchedule
- **Purpose**: Handles the scheduling and planning of upcoming audits.
- **Fields**:
  - `id`: String (UUID)
  - `plannedStartDate`: DateTime
  - `plannedEndDate`: DateTime
  - `description`: String
- **Relationships**:
  - Belongs to `Audit` (auditId)
- **Indexes**: Index on `plannedStartDate`.
- **Constraints**: `auditId` must be unique (1:1 relationship).
- **Validation notes**: `plannedEndDate` must be >= `plannedStartDate`.
- **Reason the model is required**: Supports the Audit Scheduling requirement.

### Model: AuditFinding
- **Purpose**: Specific issues or observations found during an Audit.
- **Fields**:
  - `id`: String (UUID)
  - `description`: String
  - `severity`: String (MINOR, MAJOR, CRITICAL, OBSERVATION)
  - `createdAt`: DateTime
- **Relationships**:
  - Belongs to `Audit` (auditId)
  - Has many `CorrectiveAction`s
- **Indexes**: Index on `auditId`, `severity`.
- **Constraints**: None.
- **Validation notes**: Description cannot be empty.
- **Reason the model is required**: Granular tracking of audit results.

### Model: Risk
- **Purpose**: Identifies and evaluates ESG-related risks.
- **Fields**:
  - `id`: String (UUID)
  - `title`: String
  - `category`: String (ENVIRONMENTAL, SOCIAL, GOVERNANCE)
  - `impact`: Integer (1-5)
  - `likelihood`: Integer (1-5)
  - `mitigationPlan`: String
  - `status`: String (IDENTIFIED, MITIGATED, ACCEPTED)
- **Relationships**:
  - Owned by `Department` (departmentId)
- **Indexes**: Index on `category`, `status`, `departmentId`.
- **Constraints**: `impact` and `likelihood` must be between 1 and 5.
- **Validation notes**: None.
- **Reason the model is required**: Required for the Risk Management feature.

### Model: GovernanceKPI
- **Purpose**: Stores historical and current key performance indicators for Governance.
- **Fields**:
  - `id`: String (UUID)
  - `metricName`: String
  - `value`: Float
  - `target`: Float
  - `period`: String (e.g., "2026-Q1")
  - `measuredAt`: DateTime
- **Relationships**: None.
- **Indexes**: Index on `metricName`, `period`.
- **Constraints**: Unique combination of `metricName` and `period`.
- **Validation notes**: Value and target should be numeric.
- **Reason the model is required**: Supports the Governance KPIs dashboard.

---

## 2. Reports

### Model: ESGReport
- **Purpose**: Stores generated periodic reports for the organization or department.
- **Fields**:
  - `id`: String (UUID)
  - `title`: String
  - `type`: String (MONTHLY, YEARLY, CUSTOM)
  - `status`: String (GENERATING, COMPLETED, FAILED)
  - `content`: String (JSON or HTML)
  - `createdAt`: DateTime
- **Relationships**:
  - Generated by `User` (creatorId)
  - Belongs to `Department` (nullable, for dept-specific reports)
- **Indexes**: Index on `type`, `status`.
- **Constraints**: None.
- **Validation notes**: None.
- **Reason the model is required**: Fulfills ESG Reports, Monthly/Yearly Reports requirements.

### Model: ReportHistory
- **Purpose**: Tracks when and who viewed or interacted with specific reports.
- **Fields**:
  - `id`: String (UUID)
  - `action`: String (VIEWED, DOWNLOADED, SHARED)
  - `timestamp`: DateTime
- **Relationships**:
  - Belongs to `ESGReport` (reportId)
  - Performed by `User` (userId)
- **Indexes**: Index on `reportId`, `userId`.
- **Constraints**: None.
- **Validation notes**: None.
- **Reason the model is required**: Essential for the Report History feature.

### Model: ReportExport
- **Purpose**: Stores links or binary data for exported files (PDF, CSV).
- **Fields**:
  - `id`: String (UUID)
  - `format`: String (PDF, CSV, EXCEL)
  - `fileUrl`: String
  - `expiresAt`: DateTime
  - `createdAt`: DateTime
- **Relationships**:
  - Belongs to `ESGReport` (reportId)
- **Indexes**: Index on `expiresAt`.
- **Constraints**: `fileUrl` must be a valid URI.
- **Validation notes**: None.
- **Reason the model is required**: Handles the Export Reports feature.

### Model: ReportFilter
- **Purpose**: Saves reusable query filters for custom analytics and reports.
- **Fields**:
  - `id`: String (UUID)
  - `name`: String
  - `criteria`: String (JSON string storing filter logic)
  - `isShared`: Boolean
- **Relationships**:
  - Owned by `User` (ownerId)
- **Indexes**: Index on `ownerId`.
- **Constraints**: `name` must be unique per `ownerId`.
- **Validation notes**: `criteria` must be valid JSON.
- **Reason the model is required**: Supports the Report Filters and Analytics features.

---

## 3. Settings

### Model: OrganizationSettings
- **Purpose**: Global settings applied across the entire platform.
- **Fields**:
  - `id`: String (UUID)
  - `companyName`: String
  - `fiscalYearStart`: String (Month/Day)
  - `currency`: String
  - `industry`: String
- **Relationships**: None.
- **Indexes**: None.
- **Constraints**: Should ideally be a singleton (only one row exists).
- **Validation notes**: None.
- **Reason the model is required**: Required for Organization Settings and General Configuration.

### Model: DepartmentSettings
- **Purpose**: Overrides or specific settings for individual departments.
- **Fields**:
  - `id`: String (UUID)
  - `budgetLimit`: Float
  - `headcountTarget`: Integer
  - `customFields`: String (JSON)
- **Relationships**:
  - Belongs to `Department` (departmentId)
- **Indexes**: Index on `departmentId`.
- **Constraints**: `departmentId` must be unique (1:1).
- **Validation notes**: None.
- **Reason the model is required**: Fulfills the Department Settings requirement.

### Model: ESGConfiguration
- **Purpose**: Global thresholds, calculation weights, and constants for ESG metrics.
- **Fields**:
  - `id`: String (UUID)
  - `environmentalWeight`: Float
  - `socialWeight`: Float
  - `governanceWeight`: Float
  - `activeFramework`: String (e.g., GRI, SASB, TCFD)
- **Relationships**: None.
- **Indexes**: None.
- **Constraints**: Weights must sum to 1.0 (or 100%).
- **Validation notes**: None.
- **Reason the model is required**: Necessary for the ESG Configuration feature.

### Model: UserPreference
- **Purpose**: Personal UI and behavior settings for users.
- **Fields**:
  - `id`: String (UUID)
  - `theme`: String (LIGHT, DARK, SYSTEM)
  - `language`: String
  - `dashboardLayout`: String (JSON representation of widgets)
- **Relationships**:
  - Belongs to `User` (userId)
- **Indexes**: Index on `userId`.
- **Constraints**: `userId` must be unique (1:1).
- **Validation notes**: None.
- **Reason the model is required**: Fulfills the User Preferences requirement.

### Model: NotificationPreference
- **Purpose**: User-specific configuration for alerts and messaging.
- **Fields**:
  - `id`: String (UUID)
  - `emailAlerts`: Boolean
  - `pushNotifications`: Boolean
  - `digestFrequency`: String (DAILY, WEEKLY, NEVER)
- **Relationships**:
  - Belongs to `User` (userId)
- **Indexes**: Index on `userId`.
- **Constraints**: `userId` must be unique (1:1).
- **Validation notes**: None.
- **Reason the model is required**: Supports the Notification Preferences requirement.
