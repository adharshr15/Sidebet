const authorizeBetCreator = async (req, res, next) => {
    const { userId } = req;
    const { id: betId } = req.params

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
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

const authorizeGroupCreator = async (req, res, next) => {
    const { userId } = req;
    const { id: groupId } = req.params

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
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

module.exports = { authorizeBetCreator, authorizeGroupCreator }