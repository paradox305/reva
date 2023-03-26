/*
  Warnings:

  - Added the required column `STATUS` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "STATUS" VARCHAR(20) NOT NULL;
