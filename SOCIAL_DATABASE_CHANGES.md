# Social Module Database Changes

Please add the following models to your `backend/prisma/schema.prisma` file and run `npx prisma db push` or `npx prisma migrate dev`.

## Models, Fields, and Relationships

```prisma
model CSRActivity {
  id              String                  @id @default(uuid())
  title           String
  description     String
  date            DateTime
  status          String                  // DRAFT, ACTIVE, COMPLETED, CANCELLED
  location        String?
  maxParticipants Int?
  points          Int                     @default(0)
  createdAt       DateTime                @default(now())
  updatedAt       DateTime                @updatedAt
  participations  EmployeeParticipation[]

  @@index([status])
  @@index([date])
}

model EmployeeParticipation {
  id         String      @id @default(uuid())
  userId     String      // Foreign key to User
  activityId String
  status     String      // REGISTERED, ATTENDED, NO_SHOW
  hours      Float       @default(0)
  feedback   String?
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt

  activity   CSRActivity @relation(fields: [activityId], references: [id])
  user       User        @relation(fields: [userId], references: [id])

  @@unique([userId, activityId]) // Constraint: A user can only participate once per activity
  @@index([activityId])
  @@index([userId])
}

model SocialKPI {
  id                    String   @id @default(uuid())
  period                String   // e.g. "2026-Q1"
  totalVolunteerHours   Float    @default(0)
  diversityScore        Float    @default(0)
  communityInvestment   Float    @default(0)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@unique([period]) // Constraint: Only one KPI record per period
}
```

## Relationships to Add to Existing Models

**In `model User`:**
```prisma
  participations EmployeeParticipation[]
```

## Indexes
- `CSRActivity`: Indexed on `status` and `date` for faster filtering.
- `EmployeeParticipation`: Indexed on `activityId` and `userId` for quick lookups of a user's activities or an activity's participants.

## Constraints
- `EmployeeParticipation`: Unique constraint on `[userId, activityId]` to prevent duplicate registrations.
- `SocialKPI`: Unique constraint on `[period]` to ensure only one KPI record exists per reporting period.
