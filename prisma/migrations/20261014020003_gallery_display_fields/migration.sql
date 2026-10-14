-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_eventId_fkey";

-- AlterTable
ALTER TABLE "EventVideo" ALTER COLUMN "isPrimary" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imagePublicId" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "EventFaq" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventFaq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventFaq_eventId_active_sortOrder_idx" ON "EventFaq"("eventId", "active", "sortOrder");

-- CreateIndex
CREATE INDEX "Gallery_eventId_active_sortOrder_idx" ON "Gallery"("eventId", "active", "sortOrder");

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventFaq" ADD CONSTRAINT "EventFaq_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
