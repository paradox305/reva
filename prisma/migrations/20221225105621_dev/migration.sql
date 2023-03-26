/*
  Warnings:

  - You are about to drop the column `ORDER_UUID` on the `session` table. All the data in the column will be lost.
  - The `STATUS` column on the `session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_ORDER_UUID_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "SESSION_UUID" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "ORDER_UUID",
DROP COLUMN "STATUS",
ADD COLUMN     "STATUS" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_SESSION_UUID_fkey" FOREIGN KEY ("SESSION_UUID") REFERENCES "session"("SESSION_UUID") ON DELETE SET NULL ON UPDATE CASCADE;
