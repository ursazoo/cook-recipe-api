/*
  Warnings:

  - Added the required column `emoji` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `emoji` VARCHAR(191) NOT NULL;
