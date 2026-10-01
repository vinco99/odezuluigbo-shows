/*
  Warnings:

  - Added the required column `authorName` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('CULTURE', 'ENTERTAINMENT', 'DIASPORA', 'HERITAGE', 'LIFESTYLE', 'SUCCESS', 'EVENTS');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "category" "BlogCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "Blog_category_idx" ON "Blog"("category");

-- CreateIndex
CREATE INDEX "Blog_createdAt_idx" ON "Blog"("createdAt");
