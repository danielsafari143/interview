-- AlterTable
ALTER TABLE "meetings" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
