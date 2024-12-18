const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createFriendship = async (userId, friendshipData) => {
    const userAId = userId;
    const { userBId } = friendshipData;
    console.log(userAId);
    console.log(userBId);

    try {
        console.log('in try')
        const userA = await prisma.user.findUnique({
            where: { id: userAId }, 
            include: { sentFriendships: true }
        })
        if (!userA) { throw new Error('userA not found'); }
        console.log('found userA')

        const userB = await prisma.user.findUnique({
            where: { id: userBId },
            include: { receivedFriendships: true }
        });
        if (!userB) {throw new Error('userB not found'); }
        console.log('found userB')

        const friendship = await prisma.friendship.create({
            data: {
                friendAId : userAId,
                friendBId : userBId
            },
            include: {
                friendA : true,
                friendB : true
            }
        });
        console.log(friendship)

        return friendship;
    } catch (e) {
        throw new Error(`Failed to create friendship: ${error.message}`);
    }
}

// READ
const getFriendships = async (userId) => {
    const friendships = await prisma.friendship.findMany({
        where: {
            OR: [
                { friendAId: userId },
                { friendBId: userId }
            ]
        }
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