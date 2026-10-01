/*
  Warnings:

  - A unique constraint covering the columns `[userId,eventId]` on the table `PendingApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PendingApplication_userId_eventId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "PendingApplication_userId_eventId_key" ON "PendingApplication"("userId", "eventId");
