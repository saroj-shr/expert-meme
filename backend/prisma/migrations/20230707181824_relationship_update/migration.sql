/*
  Warnings:

  - A unique constraint covering the columns `[meterId]` on the table `PowerConsumption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PowerConsumption_meterId_key" ON "PowerConsumption"("meterId");
