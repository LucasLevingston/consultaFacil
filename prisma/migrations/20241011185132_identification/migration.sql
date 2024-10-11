/*
  Warnings:

  - You are about to drop the column `identificationDocument` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationNumber` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationType` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocument` on the `PatientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationNumber` on the `PatientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationType` on the `PatientDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorDetails" DROP COLUMN "identificationDocument",
DROP COLUMN "identificationNumber",
DROP COLUMN "identificationType",
ADD COLUMN     "identificationDocumentId" TEXT,
ADD COLUMN     "identificationDocumentType" TEXT,
ADD COLUMN     "identificationDocumentUrl" TEXT;

-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "identificationDocument",
DROP COLUMN "identificationNumber",
DROP COLUMN "identificationType",
ADD COLUMN     "identificationDocumentId" TEXT,
ADD COLUMN     "identificationDocumentType" TEXT,
ADD COLUMN     "identificationDocumentUrl" TEXT;
