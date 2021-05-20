/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `DeviceDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DeviceDetails.deviceId_unique" ON "DeviceDetails"("deviceId");
