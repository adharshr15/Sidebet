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
                creatorId,
                members: {
                    connect: {
                        id: creatorId
                    }
                }
            },
            include: {
                creator: {
                    include: {
                        createdGroups: true
                    }
                }, 
                members: true
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
        where: {
            OR: [
            { creatorId: userId },
            { members: { some: { id: userId } } }
            ]
        },
        include: {
            creator: true,
            members: true
        }
    });
    return groups;
};
  
// UPDATE
const updateGroup = async (id, data) => {
    // update name
    if (data.name) {
        const group = await prisma.group.update({
            where: { id },
            data,
            include: {
                members: true,
                creator: true
            }
        });
        
        return group
    }

    // add member
    if (data.memberId && data.action === 'add') {
        const group = await prisma.group.update({
            where: { id },
            data: {
                members: {
                    connect: { id: data.memberId }
                }
            },
            include: {
                members: true
            }
        })
        
        return group;
    }

    // remove member
    if (data.memberId && data.action === 'remove') {
        const group = await prisma.group.update({
            where: { id },
            data: {
                members: {
                    disconnect: { id: data.memberId }
                }
            },
            include: {
                members: true
            }
        });
        
        return group;
    }
    

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
