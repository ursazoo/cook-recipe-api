-- AlterTable
ALTER TABLE `Cookware` ADD COLUMN `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedTime` DATETIME(3) NULL;
