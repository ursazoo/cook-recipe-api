-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `times` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `IngredientSubType` ADD COLUMN `times` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `IngredientType` ADD COLUMN `times` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
