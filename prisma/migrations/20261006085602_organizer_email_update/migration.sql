/*
  Warnings:

  - Added the required column `email` to the `OrganizerApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizerApplication" ADD COLUMN     "email" TEXT NOT NULL;
