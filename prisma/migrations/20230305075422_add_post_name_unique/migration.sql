/*
  Warnings:

  - You are about to drop the column `times` on the `IngredientSubType` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `IngredientType` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `IngredientSubType` DROP COLUMN `times`;

-- AlterTable
ALTER TABLE `IngredientType` DROP COLUMN `times`;

-- CreateIndex
CREATE UNIQUE INDEX `Post_title_key` ON `Post`(`title`);
