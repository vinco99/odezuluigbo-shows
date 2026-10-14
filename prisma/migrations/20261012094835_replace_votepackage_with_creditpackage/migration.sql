/*
  Warnings:

  - You are about to drop the `VotePackage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `CreditPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VotePackage" DROP CONSTRAINT "VotePackage_eventId_fkey";

-- AlterTable
ALTER TABLE "CreditPackage" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "eventId" TEXT NOT NULL;

-- DropTable
DROP TABLE "VotePackage";

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
