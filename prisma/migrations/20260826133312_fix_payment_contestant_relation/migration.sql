/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Contestant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Contestant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_contestantId_fkey";

-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contestant_paymentId_key" ON "Contestant"("paymentId");

-- AddForeignKey
ALTER TABLE "Contestant" ADD CONSTRAINT "Contestant_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
