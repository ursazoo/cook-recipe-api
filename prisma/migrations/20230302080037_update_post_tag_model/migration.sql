/*
  Warnings:

  - You are about to drop the column `title` on the `Tag` table. All the data in the column will be lost.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Made the column `passwd` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `Post` MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `passwd` VARCHAR(191) NOT NULL,
    MODIFY `role` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
