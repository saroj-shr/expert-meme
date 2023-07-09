/*
  Warnings:

  - A unique constraint covering the columns `[hardwareId]` on the table `Meter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meter_hardwareId_key" ON "Meter"("hardwareId");
