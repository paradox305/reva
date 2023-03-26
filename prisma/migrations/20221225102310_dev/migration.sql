/*
  Warnings:

  - Added the required column `FEEDBACK` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "FEEDBACK" VARCHAR(255) NOT NULL;
