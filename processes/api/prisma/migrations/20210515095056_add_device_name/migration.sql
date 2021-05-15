/*
  Warnings:

  - Added the required column `deviceName` to the `DeviceDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeviceDetails" ADD COLUMN     "deviceName" TEXT NOT NULL;
