/*
  Warnings:

  - You are about to drop the column `photo` on the `Contestant` table. All the data in the column will be lost.
  - You are about to drop the column `photoPublicId` on the `Contestant` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `PendingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `PendingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `PendingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `PendingApplication` table. All the data in the column will be lost.
  - You are about to drop the column `photoPublicId` on the `PendingApplication` table. All the data in the column will be lost.
  - Added the required column `city` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPhoto` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPhotoPublicId` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portrait` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portraitPublicId` to the `PendingApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contestant" DROP COLUMN "photo",
DROP COLUMN "photoPublicId",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullPhoto" TEXT,
ADD COLUMN     "fullPhotoPublicId" TEXT,
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "guardianPhone" TEXT,
ADD COLUMN     "guardianRelation" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "potrait" TEXT,
ADD COLUMN     "potraitPublicId" TEXT,
ADD COLUMN     "talent" TEXT;

-- AlterTable
ALTER TABLE "PendingApplication" DROP COLUMN "bio",
DROP COLUMN "birthday",
DROP COLUMN "height",
DROP COLUMN "photo",
DROP COLUMN "photoPublicId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "course" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "fullPhoto" TEXT NOT NULL,
ADD COLUMN     "fullPhotoPublicId" TEXT NOT NULL,
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "guardianPhone" TEXT,
ADD COLUMN     "guardianRelation" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "portrait" TEXT NOT NULL,
ADD COLUMN     "portraitPublicId" TEXT NOT NULL,
ADD COLUMN     "talent" TEXT,
ADD COLUMN     "tiktok" TEXT;

-- CreateIndex
CREATE INDEX "Contestant_eventId_applicationStatus_idx" ON "Contestant"("eventId", "applicationStatus");

-- CreateIndex
CREATE INDEX "Contestant_userId_eventId_idx" ON "Contestant"("userId", "eventId");
