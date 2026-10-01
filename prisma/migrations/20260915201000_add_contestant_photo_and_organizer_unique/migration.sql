ALTER TABLE "PendingApplication" ADD COLUMN "photo" TEXT;

CREATE UNIQUE INDEX "OrganizerApplication_userId_key" ON "OrganizerApplication"("userId");
