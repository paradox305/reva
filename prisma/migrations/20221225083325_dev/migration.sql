/*
  Warnings:

  - Changed the type of `EMPLOYEE_JOINING_DATE` on the `employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "employee" DROP COLUMN "EMPLOYEE_JOINING_DATE",
ADD COLUMN     "EMPLOYEE_JOINING_DATE" INTEGER NOT NULL;
