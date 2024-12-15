const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createGroup = async (userId, name) => {
    const creatorId = userId;

    try {
        // get creator from creatorId
        const creator = await prisma.user.findUnique({
            where: { id: creatorId },
            include: {
                createdGroups: true,
            }
        })
        if (!creator) { throw new Error('Creator not found'); }

        // creator group with user as creator
        const group = await prisma.group.create({
            data: {
                name,
                creatorId
            },
            include: {
                creator: {
                    include: {
                        createdGroups: true
                    }
                }
            },
        });
    
        return group;
    } catch (e) {
        throw new Error(`Failed to Create new Group ${e}`)
    }
};

// READ
const getGroups = async (userId) => {
    const groups = await prisma.group.findMany({
        where: { creatorId: userId }
    });
    return groups;
};
  
// UPDATE
const updateGroup = async (id, data) => {
    const group = await prisma.group.update({
        where: { id },
        data,
    });

    return group;
};
  
// DELETE
const deleteGroup = async (id) => {
    await prisma.group.delete({
        where: { id },
    });

    return { message: 'Group Deleted' };
};

module.exports = { createGroup, getGroups, updateGroup, deleteGroup };