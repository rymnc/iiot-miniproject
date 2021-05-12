/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tokens.value_unique" ON "Tokens"("value");
