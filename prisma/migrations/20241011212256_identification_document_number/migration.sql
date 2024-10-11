/*
  Warnings:

  - You are about to drop the column `identificationNumber` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationNumber` on the `PatientDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorDetails" DROP COLUMN "identificationNumber",
ADD COLUMN     "identificationDocumentNumber" TEXT;

-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "identificationNumber",
ADD COLUMN     "identificationDocumentNumber" TEXT;
