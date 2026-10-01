-- CreateTable
CREATE TABLE "OrganizerApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "experience" TEXT,
    "proposal" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    CONSTRAINT "OrganizerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VotePackage" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VotePackage_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "Judge" ADD COLUMN "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "Sponsor" ADD COLUMN "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- Indexes
CREATE INDEX "OrganizerApplication_status_idx" ON "OrganizerApplication"("status");
CREATE INDEX "OrganizerApplication_userId_idx" ON "OrganizerApplication"("userId");
CREATE INDEX "VotePackage_eventId_active_idx" ON "VotePackage"("eventId", "active");

-- Foreign keys
ALTER TABLE "OrganizerApplication" ADD CONSTRAINT "OrganizerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "VotePackage" ADD CONSTRAINT "VotePackage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
