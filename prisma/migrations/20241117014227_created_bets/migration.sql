-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;