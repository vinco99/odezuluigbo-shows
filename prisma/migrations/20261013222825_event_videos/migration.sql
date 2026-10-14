/*
  Warnings:

  - You are about to drop the column `liveStreamActive` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `liveStreamTitle` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `liveStreamUrl` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventVideoKind" AS ENUM ('LIVE', 'UPCOMING', 'REPLAY', 'HIGHLIGHT', 'OTHER');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "liveStreamActive",
DROP COLUMN "liveStreamTitle",
DROP COLUMN "liveStreamUrl";

-- CreateTable
CREATE TABLE "EventVideo" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "kind" "EventVideoKind" NOT NULL DEFAULT 'OTHER',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventVideo_eventId_active_sortOrder_idx" ON "EventVideo"("eventId", "active", "sortOrder");

-- CreateIndex
CREATE INDEX "EventVideo_eventId_isPrimary_idx" ON "EventVideo"("eventId", "isPrimary");

-- AddForeignKey
ALTER TABLE "EventVideo" ADD CONSTRAINT "EventVideo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
