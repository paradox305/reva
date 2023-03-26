/*
  Warnings:

  - You are about to drop the column `MENU_AMOUNT` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `MENU_DESCRIPTION` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `MENU_NAME` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `MENU_STATUS` on the `menu` table. All the data in the column will be lost.
  - Added the required column `CATEGORY` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DISH` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRICE` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QUANTITY` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "MENU_AMOUNT",
DROP COLUMN "MENU_DESCRIPTION",
DROP COLUMN "MENU_NAME",
DROP COLUMN "MENU_STATUS",
ADD COLUMN     "CATEGORY" VARCHAR(100) NOT NULL,
ADD COLUMN     "DISH" VARCHAR(255) NOT NULL,
ADD COLUMN     "PRICE" VARCHAR(100) NOT NULL,
ADD COLUMN     "QUANTITY" TEXT NOT NULL;
