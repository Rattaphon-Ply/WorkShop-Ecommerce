/*
  Warnings:

  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentcy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` 
    ADD COLUMN `amount` INT NOT NULL DEFAULT 0,
    ADD COLUMN `currentcy` VARCHAR(191) NOT NULL DEFAULT 'THB',
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `stripePaymentId` VARCHAR(191) NOT NULL DEFAULT '';
