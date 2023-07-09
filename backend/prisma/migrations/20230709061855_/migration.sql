/*
  Warnings:

  - You are about to drop the column `month` on the `Meter` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Meter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meter" DROP COLUMN "month",
DROP COLUMN "year";
