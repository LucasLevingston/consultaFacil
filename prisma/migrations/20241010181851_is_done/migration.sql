/*
  Warnings:

  - You are about to drop the column `idDone` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "idDone",
ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false;
