/*
  Warnings:

  - You are about to drop the column `semsester` on the `Module` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "semsester",
ADD COLUMN     "semester" INTEGER NOT NULL;
