/*
  Warnings:

  - The primary key for the `_userfriends` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `my_row_id` on the `_userfriends` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `_userfriends` DROP PRIMARY KEY,
    DROP COLUMN `my_row_id`;

-- CreateTable
CREATE TABLE `_UserGroups` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserGroups_AB_unique`(`A`, `B`),
    INDEX `_UserGroups_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserGroups` ADD CONSTRAINT `_UserGroups_A_fkey` FOREIGN KEY (`A`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserGroups` ADD CONSTRAINT `_UserGroups_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
