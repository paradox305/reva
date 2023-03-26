-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "COMPANY_UUID" TEXT;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_COMPANY_UUID_fkey" FOREIGN KEY ("COMPANY_UUID") REFERENCES "company"("COMPANY_UUID") ON DELETE SET NULL ON UPDATE CASCADE;