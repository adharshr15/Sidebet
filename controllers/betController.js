const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createBet = async (betData) => {
    const {
        description,
        deadline,
        amount,
        creatorId,
        opponentId,
        opponentGroupId,
        isGroupBet
    } = betData;


    // makes sure required opponent id is given
    if (isGroupBet && !opponentGroupId) { throw new Error('Group Bet requires opponentGroupId') }
    if (!isGroupBet && !opponentId) { throw new Error('Individual Bet requires opponentId') }


    try {
        // finds creator User
        const creator = await prisma.user.findUnique({
            where: { id: creatorId }
        })
        if (!creator) { throw new Error('Creator not found'); }

        // if Group Bet, finds opponentGroup Group
        if (isGroupBet) {
            const group = await prisma.group.findUnique({
                where: { id: opponentGroupId }
            });
            if (!group) { throw new Error('Opponent group not found'); }
        }
        // if not Group Bet, finds opponent User
        else {
            const opponent = await prisma.user.findUnique({
                where: { id: opponentId }
            });
            if (!opponent) {
                throw new Error('Opponent not found');
            }
        }


        // creates bet
        const bet = await prisma.bet.create({
            data: {
                amount, 
                creatorId,
                opponentId: isGroupBet ? null : opponentId,
                opponentGroupId: isGroupBet ? opponentGroupId : null,
                description,
                deadline: deadline ? new Date(deadline) : undefined,
                isGroupBet,
                status: 'PENDING'
            },
            include: {
                creator: true,
                opponent: true,
                opponentGroup: true
            }
        });

        return bet;
    } 
    catch (error) { throw new Error(`Failed to create bet: ${error.message}`) };
}


// READ
const getBets = async() => {
    const bets = await prisma.bet.findMany();
    return bets;
}


// UPDATE
const updateBet = async(id, data) => {
    const bet = await prisma.bet.update({
        where: { id },
        data
    });

    return bet;
}

// DELETE
const deleteBet = async(id) => {
    await prisma.bet.delete({
        where: { id }
    });

    return {message: "Bet Deleted" };
}

module.exports = { createBet, getBets, updateBet, deleteBet }