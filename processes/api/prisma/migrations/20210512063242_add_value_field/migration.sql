/*
  Warnings:

  - Added the required column `value` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tokens" ADD COLUMN     "value" TEXT NOT NULL;
