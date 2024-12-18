const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authorizeBetCreator = async (req, res, next) => {
    console.log("authorize bet creator middlware hit");

    const { userId } = req;
    const betId = parseInt(req.params.id, 10);

    try {
        // fetch bet
        const bet = await prisma.bet.findUnique({
            where: { id: betId },
            select: { creatorId: true }
        });
        // ensure bet found
        if (!bet) { return res.status(404).json({ message: 'Bet not found' }); }
        
        // ensure bet creator and user are same
        if (bet.creatorId !== userId) { return res.status(403).json({ message: 'Forbidden: You do not have access to modify this bet' }); }

        // if user is authorized continue
        next();
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error ' + e });
    }

}

const authorizeGroupCreator = async (req, res, next) => {
    console.log("authorize middleware hit");

    const { userId } = req;
    const groupId = parseInt(req.params.id, 10);

    try {
        // fetch group
        const group = await prisma.group.findUnique({
            where: { id: groupId }, 
            select: { creatorId: true }
        });

        // ensure group found
        if (!group) { return res.status(404).json({ message: "Group not found " }); }

        // ensure group creator and user are same
        if (group.creatorId !== userId) { return res.status(403).json({ message: "You do not have access to modify this group"}); }

        // if authorized continue
        next();   
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error ' + e });
    }

}

const authorizeFriendshipCreator = async (req, res, next) => {
    console.log("authorize friendship creator middlware hit");

    const { userId } = req;
    const friendshipId = parseInt(req.params.id, 10);

    try {
        // fetch friendship
        const friendship = await prisma.friendship.findUnique({
            where: { id: friendshipId },
            select: { userAId: true, userBId: true }
        });
        // ensure friendship found
        if (!friendship) { return res.status(404).json({ message: 'Bet not found' }); }
        
        // ensure friendship userA or userB and user are same
        if (friendship.userAId !== userId && friendship.userBId !== userId ) { return res.status(403).json({ message: 'Forbidden: You do not have access to modify this bet' }); }

        // if user is authorized continue
        next();
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error ' + e });
    }

}

module.exports = { authorizeBetCreator, authorizeGroupCreator, authorizeFriendshipCreator }