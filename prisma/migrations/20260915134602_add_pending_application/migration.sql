-- CreateTable
CREATE TABLE "PendingApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PendingApplication_userId_eventId_idx" ON "PendingApplication"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "PendingApplication" ADD CONSTRAINT "PendingApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingApplication" ADD CONSTRAINT "PendingApplication_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
