-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `account` VARCHAR(191) NULL,
    `role` INTEGER NOT NULL DEFAULT 3,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_account_key`(`account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dish` (
    `id` VARCHAR(191) NOT NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remark` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NULL,

    UNIQUE INDEX `Post_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrimaryMaterial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NULL,

    UNIQUE INDEX `PrimaryMaterial_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecondaryMaterial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `primaryMaterialId` VARCHAR(191) NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NULL,

    UNIQUE INDEX `SecondaryMaterial_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BaseMaterial` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `emoji` VARCHAR(191) NOT NULL,
    `secondaryMaterialId` VARCHAR(191) NOT NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NULL,

    UNIQUE INDEX `BaseMaterial_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cookware` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cookware_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BaseMaterialToPost` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BaseMaterialToPost_AB_unique`(`A`, `B`),
    INDEX `_BaseMaterialToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CookwareToPost` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CookwareToPost_AB_unique`(`A`, `B`),
    INDEX `_CookwareToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecondaryMaterial` ADD CONSTRAINT `SecondaryMaterial_primaryMaterialId_fkey` FOREIGN KEY (`primaryMaterialId`) REFERENCES `PrimaryMaterial`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BaseMaterial` ADD CONSTRAINT `BaseMaterial_secondaryMaterialId_fkey` FOREIGN KEY (`secondaryMaterialId`) REFERENCES `SecondaryMaterial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BaseMaterialToPost` ADD CONSTRAINT `_BaseMaterialToPost_A_fkey` FOREIGN KEY (`A`) REFERENCES `BaseMaterial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BaseMaterialToPost` ADD CONSTRAINT `_BaseMaterialToPost_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CookwareToPost` ADD CONSTRAINT `_CookwareToPost_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cookware`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CookwareToPost` ADD CONSTRAINT `_CookwareToPost_B_fkey` FOREIGN KEY (`B`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
