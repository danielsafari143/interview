/*
  Warnings:

  - Added the required column `title` to the `meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetings" ADD COLUMN     "title" CHAR(100) NOT NULL;
