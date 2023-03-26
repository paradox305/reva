/*
  Warnings:

  - You are about to drop the column `TABLE_NUMBER` on the `table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TABLE_NAME]` on the table `table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TABLE_NAME` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "table_TABLE_NUMBER_key";

-- AlterTable
ALTER TABLE "table" DROP COLUMN "TABLE_NUMBER",
ADD COLUMN     "TABLE_NAME" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "table_TABLE_NAME_key" ON "table"("TABLE_NAME");
