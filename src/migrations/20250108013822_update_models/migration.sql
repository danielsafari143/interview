/*
  Warnings:

  - Added the required column `time_slot` to the `availabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availabilities" ADD COLUMN     "time_slot" CHAR(40) NOT NULL;
