/*
  Warnings:

  - Made the column `bio` on table `PendingApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'REFUNDED';

-- AlterTable
ALTER TABLE "PendingApplication" ALTER COLUMN "bio" SET NOT NULL;
