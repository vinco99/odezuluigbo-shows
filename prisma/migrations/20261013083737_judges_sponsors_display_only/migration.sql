/*
  Warnings:

  - You are about to drop the column `status` on the `Judge` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Sponsor` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SponsorTier" AS ENUM ('PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'PARTNER');

-- AlterTable
ALTER TABLE "Judge" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tier" "SponsorTier" NOT NULL DEFAULT 'PARTNER';

-- CreateIndex
CREATE INDEX "Judge_eventId_active_sortOrder_idx" ON "Judge"("eventId", "active", "sortOrder");

-- CreateIndex
CREATE INDEX "Sponsor_eventId_active_sortOrder_idx" ON "Sponsor"("eventId", "active", "sortOrder");
