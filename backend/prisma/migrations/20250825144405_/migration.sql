/*
  Warnings:

  - You are about to drop the column `productCapacityId` on the `corLine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."corLine" DROP CONSTRAINT "corLine_productCapacityId_fkey";

-- AlterTable
ALTER TABLE "public"."corLine" DROP COLUMN "productCapacityId";
