/*
  Warnings:

  - You are about to drop the column `TABEL_CHAIRS` on the `table` table. All the data in the column will be lost.
  - You are about to drop the `bills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table_order_relation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `TABLE_CHAIRS` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_COMPANY_UUID_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_COMPANY_UUID_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_TABLE_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_BILL_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_COMPANY_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_CUSTOMER_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_EMPLOYEE_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_ORDER_UUID_fkey";

-- DropForeignKey
ALTER TABLE "table_order_relation" DROP CONSTRAINT "table_order_relation_TABLE_UUID_fkey";

-- AlterTable
ALTER TABLE "table" DROP COLUMN "TABEL_CHAIRS",
ADD COLUMN     "TABLE_CHAIRS" INTEGER NOT NULL;

-- DropTable
DROP TABLE "bills";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "table_order_relation";

-- CreateTable
CREATE TABLE "menu" (
    "MENU_UUID" TEXT NOT NULL,
    "MENU_NAME" VARCHAR(100) NOT NULL,
    "MENU_DESCRIPTION" VARCHAR(255) NOT NULL,
    "MENU_AMOUNT" INTEGER NOT NULL,
    "MENU_STATUS" VARCHAR(100) NOT NULL,
    "MENU_CREATION_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "MENU_UPDATED_AT" TIMESTAMP(3) NOT NULL,
    "COMPANY_UUID" TEXT,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("MENU_UUID")
);

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_COMPANY_UUID_fkey" FOREIGN KEY ("COMPANY_UUID") REFERENCES "company"("COMPANY_UUID") ON DELETE SET NULL ON UPDATE CASCADE;
