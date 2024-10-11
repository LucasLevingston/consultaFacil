-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "cancellationReason" TEXT,
ALTER COLUMN "reason" DROP NOT NULL;
