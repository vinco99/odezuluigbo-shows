/*
  Warnings:

  - You are about to drop the column `potrait` on the `Contestant` table. All the data in the column will be lost.
  - You are about to drop the column `potraitPublicId` on the `Contestant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contestant" DROP COLUMN "potrait",
DROP COLUMN "potraitPublicId",
ADD COLUMN     "portrait" TEXT,
ADD COLUMN     "portraitPublicId" TEXT;
