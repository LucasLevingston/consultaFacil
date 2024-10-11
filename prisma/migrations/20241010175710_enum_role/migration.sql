/*
  Warnings:

  - You are about to drop the column `isDoctor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isPatient` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'doctor', 'admin');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isDoctor",
DROP COLUMN "isPatient",
ADD COLUMN     "role" "Role" NOT NULL;
