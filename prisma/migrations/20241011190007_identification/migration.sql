/*
  Warnings:

  - You are about to drop the column `identificationDocumentId` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentId` on the `PatientDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorDetails" DROP COLUMN "identificationDocumentId",
ADD COLUMN     "identificationNumber" TEXT;

-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "identificationDocumentId",
ADD COLUMN     "identificationNumber" TEXT;
