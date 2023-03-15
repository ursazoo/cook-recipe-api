/*
  Warnings:

  - Added the required column `published` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `IngredientSubType` DROP FOREIGN KEY `IngredientSubType_ingredientTypeId_fkey`;

-- AlterTable
ALTER TABLE `IngredientSubType` MODIFY `ingredientTypeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `published` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `IngredientSubType` ADD CONSTRAINT `IngredientSubType_ingredientTypeId_fkey` FOREIGN KEY (`ingredientTypeId`) REFERENCES `IngredientType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
