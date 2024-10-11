/*
  Warnings:

  - The `disclosureConsent` column on the `PatientDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `treatmentConsent` column on the `PatientDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "disclosureConsent",
ADD COLUMN     "disclosureConsent" BOOLEAN,
DROP COLUMN "treatmentConsent",
ADD COLUMN     "treatmentConsent" BOOLEAN;
