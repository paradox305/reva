/*
  Warnings:

  - Added the required column `COMPANY_DESCRIPTION` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "COMPANY_DESCRIPTION" VARCHAR(400) NOT NULL;
