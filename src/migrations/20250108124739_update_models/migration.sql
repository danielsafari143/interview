/*
  Warnings:

  - You are about to alter the column `time_slot` on the `availabilities` table. The data in that column could be lost. The data in that column will be cast from `Char(40)` to `Char(10)`.

*/
-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_guestId_fkey";

-- DropForeignKey
ALTER TABLE "meetings" DROP CONSTRAINT "meetings_hostId_fkey";

-- AlterTable
ALTER TABLE "availabilities" ALTER COLUMN "time_slot" SET DATA TYPE CHAR(10);

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
