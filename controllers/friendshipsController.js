const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createFriendship = async (userId, userBid) => {
    const userAId = userId;

    try {
        const userA = await prisma.user.findUnique({
            where: { id: userAId }, 
            include: { sentFriendships: true }
        });
        if (!userA) { throw new Error('userA not found'); }

        const userB = await prisma.user.findUnique({
            where: { id: userBId },
            include: { receivedFriendships: true }
        });
        if (!userB) {throw new Error('userB not found'); }

        const friendship = await prisma.friendship.create({
            data: {
                userAId,
                userBId
            },
            include: {
                userA: true,
                userB: true
            }
        });

        return friendship;
    } catch (e) {
        throw new Error(`Failed to create friendship: ${error.message}`);
    }
}

// READ
const getFriendships = async (userId) => {
    const friendships = await prisma.friendship.findMany({
        where: { userAId: userId }
    });

    return friendships;
}

// UPDATE
const updateFriendship = async (id, data) => {
    const friendship = prisma.friendship.update({
        where: { id },
        data
    })

    return friendship;
}

// DELETE
const deleteFriendship = async (id) => {
    await prisma.friendship.delete({
        where: { id }
    });
}

module.exports = { createFriendship, getFriendships, updateFriendship, deleteFriendship }