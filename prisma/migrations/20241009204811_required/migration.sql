/*
  Warnings:

  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identificationDocumentUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "emergencyContactName" DROP NOT NULL,
ALTER COLUMN "emergencyContactNumber" DROP NOT NULL,
ALTER COLUMN "insuranceProvider" DROP NOT NULL,
ALTER COLUMN "insurancePolicyNumber" DROP NOT NULL,
ALTER COLUMN "identificationType" DROP NOT NULL,
ALTER COLUMN "identificationNumber" DROP NOT NULL,
ALTER COLUMN "identificationDocumentId" DROP NOT NULL,
ALTER COLUMN "primaryPhysician" DROP NOT NULL,
ALTER COLUMN "identificationDocumentUrl" SET NOT NULL,
ALTER COLUMN "treatmentConsent" DROP NOT NULL,
ALTER COLUMN "disclosureConsent" DROP NOT NULL;
