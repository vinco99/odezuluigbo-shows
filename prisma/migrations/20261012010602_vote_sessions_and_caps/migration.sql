-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "creditLimitPerSession" INTEGER;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "sessionId" TEXT;

-- CreateTable
CREATE TABLE "VoteSession" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "creditLimitPerUser" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoteSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VoteSession_eventId_startsAt_idx" ON "VoteSession"("eventId", "startsAt");

-- CreateIndex
CREATE INDEX "Vote_voterId_sessionId_idx" ON "Vote"("voterId", "sessionId");

-- AddForeignKey
ALTER TABLE "VoteSession" ADD CONSTRAINT "VoteSession_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "VoteSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
