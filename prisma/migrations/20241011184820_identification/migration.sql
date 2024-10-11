/*
  Warnings:

  - You are about to drop the column `identificationDocumentId` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentUrl` on the `DoctorDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentId` on the `PatientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `identificationDocumentUrl` on the `PatientDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DoctorDetails" DROP COLUMN "identificationDocumentId",
DROP COLUMN "identificationDocumentUrl",
ADD COLUMN     "identificationDocument" TEXT,
ADD COLUMN     "identificationNumber" TEXT,
ADD COLUMN     "identificationType" TEXT;

-- AlterTable
ALTER TABLE "PatientDetails" DROP COLUMN "identificationDocumentId",
DROP COLUMN "identificationDocumentUrl",
ADD COLUMN     "identificationDocument" TEXT,
ADD COLUMN     "identificationNumber" TEXT,
ADD COLUMN     "identificationType" TEXT;
