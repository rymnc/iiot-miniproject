/*
  Warnings:

  - A unique constraint covering the columns `[deviceName,userId]` on the table `DeviceDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "device_name_unique_per_user" ON "DeviceDetails"("deviceName", "userId");
