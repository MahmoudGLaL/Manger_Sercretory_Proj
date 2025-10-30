/*
  Warnings:

  - Changed the type of `updatedAt` on the `Manger_Meetings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Manger_Meetings" ALTER COLUMN "order" DROP NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
