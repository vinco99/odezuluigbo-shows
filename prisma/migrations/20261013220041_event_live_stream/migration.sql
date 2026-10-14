-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "liveStreamActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "liveStreamTitle" TEXT,
ADD COLUMN     "liveStreamUrl" TEXT;
