/*
  Warnings:

  - You are about to drop the column `identificationDocumentNumber` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentNumber` on the `PatientDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorDetails" DROP COLUMN "identificationDocumentNumber",
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "identificationDocumentId" TEXT;

-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "identificationDocumentNumber",
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "identificationDocumentId" TEXT;
