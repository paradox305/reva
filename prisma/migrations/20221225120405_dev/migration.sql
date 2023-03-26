/*
  Warnings:

  - Added the required column `ORDER_UPDATED_AT` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "ORDER_CREATION_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ORDER_UPDATED_AT" TIMESTAMP(3) NOT NULL;
