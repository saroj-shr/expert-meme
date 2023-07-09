/*
  Warnings:

  - A unique constraint covering the columns `[deviceName]` on the table `Meter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meter_deviceName_key" ON "Meter"("deviceName");
