-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('IMAGE', 'HTML', 'ADSENSE');

-- CreateTable
CREATE TABLE "SiteStat" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "suffix" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "placementKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "AdType" NOT NULL DEFAULT 'IMAGE',
    "imageUrl" TEXT,
    "imagePublicId" TEXT,
    "linkUrl" TEXT,
    "htmlCode" TEXT,
    "sponsorId" TEXT,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteStat_key_key" ON "SiteStat"("key");

-- CreateIndex
CREATE INDEX "SiteStat_active_sortOrder_idx" ON "SiteStat"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "Ad_placementKey_active_sortOrder_idx" ON "Ad"("placementKey", "active", "sortOrder");

-- CreateIndex
CREATE INDEX "Ad_placementKey_startAt_endAt_idx" ON "Ad"("placementKey", "startAt", "endAt");

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
