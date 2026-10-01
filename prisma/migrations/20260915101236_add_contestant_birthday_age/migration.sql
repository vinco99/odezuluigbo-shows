/*
  Warnings:

  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "state";
