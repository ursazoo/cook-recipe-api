-- DropForeignKey
ALTER TABLE `IngredientSubType` DROP FOREIGN KEY `IngredientSubType_ingredientTypeId_fkey`;

-- AlterTable
ALTER TABLE `Ingredient` ALTER COLUMN `times` DROP DEFAULT;

-- AlterTable
ALTER TABLE `IngredientSubType` MODIFY `ingredientTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `IngredientSubType` ADD CONSTRAINT `IngredientSubType_ingredientTypeId_fkey` FOREIGN KEY (`ingredientTypeId`) REFERENCES `IngredientType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
