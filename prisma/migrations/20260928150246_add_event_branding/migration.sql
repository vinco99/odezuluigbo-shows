-- AlterTable
ALTER TABLE "Contestant" ADD COLUMN     "photoPublicId" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "bannerPublicId" TEXT,
ADD COLUMN     "logoPublicId" TEXT;

-- AlterTable
ALTER TABLE "Judge" ADD COLUMN     "imagePublicId" TEXT;

-- AlterTable
ALTER TABLE "PendingApplication" ADD COLUMN     "photoPublicId" TEXT;

-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "logoPublicId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imagePublicId" TEXT;
