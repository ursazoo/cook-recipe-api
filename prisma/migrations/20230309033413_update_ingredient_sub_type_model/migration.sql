/*
  Warnings:

  - Made the column `ingredientTypeId` on table `IngredientSubType` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `IngredientSubType` DROP FOREIGN KEY `IngredientSubType_ingredientTypeId_fkey`;

-- AlterTable
ALTER TABLE `IngredientSubType` MODIFY `ingredientTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `IngredientSubType` ADD CONSTRAINT `IngredientSubType_ingredientTypeId_fkey` FOREIGN KEY (`ingredientTypeId`) REFERENCES `IngredientType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
