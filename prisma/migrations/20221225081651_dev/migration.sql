/*
  Warnings:

  - You are about to alter the column `TABLE_NAME` on the `table` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- DropIndex
DROP INDEX "table_TABLE_NAME_key";

-- AlterTable
ALTER TABLE "table" ALTER COLUMN "TABLE_NAME" SET DATA TYPE VARCHAR(100);
