-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_opponentGroupId_fkey` FOREIGN KEY (`opponentGroupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
