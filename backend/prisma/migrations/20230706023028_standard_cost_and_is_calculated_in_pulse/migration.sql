-- AlterTable
ALTER TABLE "Pulse" ADD COLUMN     "is_calculated" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "StandardCost" (
    "id" TEXT NOT NULL,
    "costPerKwh" DOUBLE PRECISION NOT NULL DEFAULT 12.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StandardCost_pkey" PRIMARY KEY ("id")
);
