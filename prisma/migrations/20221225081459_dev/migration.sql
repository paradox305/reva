/*
  Warnings:

  - Changed the type of `PRICE` on the `menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "PRICE",
ADD COLUMN     "PRICE" INTEGER NOT NULL;
