/*
  Warnings:

  - You are about to drop the column `passwd_salt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `passwd_salt`;
