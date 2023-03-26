/*
  Warnings:

  - Added the required column `color` to the `BaseMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `PrimaryMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BaseMaterial` ADD COLUMN `color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PrimaryMaterial` ADD COLUMN `color` VARCHAR(191) NOT NULL;
