/*
  Warnings:

  - You are about to drop the `CardDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DeviceTypes" AS ENUM ('SENSOR', 'ASSISTANT', 'AUTOMATION', 'SECURITY');

-- DropForeignKey
ALTER TABLE "CardDetails" DROP CONSTRAINT "CardDetails_userId_fkey";

-- DropTable
DROP TABLE "CardDetails";

-- CreateTable
CREATE TABLE "DeviceDetails" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "deviceId" TEXT NOT NULL,
    "deviceType" "DeviceTypes" NOT NULL,
    "healthy" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceDetails.userId_unique" ON "DeviceDetails"("userId");

-- AddForeignKey
ALTER TABLE "DeviceDetails" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
